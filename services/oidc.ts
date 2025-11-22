/**
 * OpenID Connect (OIDC) Provider Configuration
 * Implements production-ready OIDC/OAuth2 authentication
 * Compliant with OpenID Connect Core 1.0 specification
 */

import { Issuer, generators, type Client } from 'openid-client';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export interface OIDCConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: string;
}

export interface DeafAuthClaims extends JWTPayload {
  sub: string;
  email?: string;
  deaf_identity?: boolean;
  sign_languages?: string[];
  communication_preferences?: string[];
  accessibility_profile?: {
    preferred_communication: string;
    visual_alerts: boolean;
    caption_support: boolean;
  };
}

export class OIDCProvider {
  private client: Client | null = null;
  private config: OIDCConfig;
  private jwtSecret: Uint8Array;
  private codeVerifiers: Map<string, string> = new Map(); // Store code verifiers by state

  constructor(config: OIDCConfig, jwtSecret: string) {
    this.config = {
      scope: 'openid email profile',
      ...config,
    };
    this.jwtSecret = new TextEncoder().encode(jwtSecret);
  }

  /**
   * Initialize OIDC client with issuer discovery
   */
  async initialize(): Promise<void> {
    try {
      const issuer = await Issuer.discover(this.config.issuer);
      this.client = new issuer.Client({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uris: [this.config.redirectUri],
        response_types: ['code'],
      });
    } catch (error) {
      console.error('Failed to initialize OIDC client:', error);
      throw error;
    }
  }

  /**
   * Generate authorization URL for deaf-first authentication flow
   */
  getAuthorizationUrl(state?: string): { url: string; state: string; codeVerifier: string } {
    if (!this.client) {
      throw new Error('OIDC client not initialized');
    }

    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const authState = state || generators.state();

    // Store code verifier for later use in callback
    this.codeVerifiers.set(authState, codeVerifier);

    const url = this.client.authorizationUrl({
      scope: this.config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: authState,
      // Add deaf-specific claims
      claims: JSON.stringify({
        userinfo: {
          deaf_identity: null,
          sign_languages: null,
          accessibility_profile: null,
        },
      }),
    });

    return { url, state: authState, codeVerifier };
  }

  /**
   * Exchange authorization code for tokens
   */
  async handleCallback(params: URLSearchParams, state: string): Promise<DeafAuthClaims> {
    if (!this.client) {
      throw new Error('OIDC client not initialized');
    }

    // Retrieve the stored code verifier
    const codeVerifier = this.codeVerifiers.get(state);
    if (!codeVerifier) {
      throw new Error('Code verifier not found for state');
    }

    // Clean up stored verifier
    this.codeVerifiers.delete(state);

    const tokenSet = await this.client.callback(
      this.config.redirectUri,
      params,
      { code_verifier: codeVerifier, state }
    );

    // Get user info with deaf-specific claims
    const userinfo = await this.client.userinfo(tokenSet.access_token!);

    return {
      sub: userinfo.sub,
      email: userinfo.email as string | undefined,
      deaf_identity: (userinfo as any).deaf_identity,
      sign_languages: (userinfo as any).sign_languages,
      communication_preferences: (userinfo as any).communication_preferences,
      accessibility_profile: (userinfo as any).accessibility_profile,
    };
  }

  /**
   * Create a custom JWT for DeafAuth with accessibility claims
   */
  async createDeafAuthToken(claims: DeafAuthClaims): Promise<string> {
    const token = await new SignJWT({
      ...claims,
      aud: 'deafauth-ecosystem',
      iss: 'https://deafauth.mbtq.dev',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(this.jwtSecret);

    return token;
  }

  /**
   * Verify DeafAuth token
   */
  async verifyToken(token: string): Promise<DeafAuthClaims> {
    const { payload } = await jwtVerify(token, this.jwtSecret, {
      issuer: 'https://deafauth.mbtq.dev',
      audience: 'deafauth-ecosystem',
    });

    return payload as DeafAuthClaims;
  }

  /**
   * Create token with deaf user identity flag for partner services
   * This communicates to PinkSync and partners that user is deaf
   */
  async createPartnerToken(userId: string, isDeaf: boolean, metadata?: any): Promise<string> {
    const token = await new SignJWT({
      sub: userId,
      deaf_user: isDeaf,
      requires_accessibility: isDeaf,
      partner_metadata: metadata || {},
      aud: ['pinksync', '360magicians', 'fibronrose'],
      iss: 'https://deafauth.mbtq.dev',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(this.jwtSecret);

    return token;
  }

  /**
   * Validate Supabase custom auth token
   */
  async validateSupabaseAuth(supabaseToken: string): Promise<boolean> {
    try {
      // Supabase uses JWT tokens - verify the signature
      const { payload } = await jwtVerify(supabaseToken, this.jwtSecret);
      return !!payload.sub;
    } catch {
      return false;
    }
  }
}

/**
 * Factory function to create OIDC provider instance
 */
export function createOIDCProvider(config: OIDCConfig, jwtSecret: string): OIDCProvider {
  return new OIDCProvider(config, jwtSecret);
}

/**
 * Middleware to extract deaf user information and communicate to downstream services
 */
export function deafUserMiddleware() {
  return async (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        // Add deaf user flag to request context for partner services
        const provider = req.app.get('oidcProvider');
        if (provider) {
          const claims = await provider.verifyToken(token);
          req.deafUser = {
            isDeaf: claims.deaf_identity || false,
            signLanguages: claims.sign_languages || [],
            accessibilityNeeds: claims.accessibility_profile || {},
          };
        }
      }
      next();
    } catch (error) {
      console.error('Deaf user middleware error:', error);
      next();
    }
  };
}
