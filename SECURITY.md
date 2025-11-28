# DeafAuth Security & Compliance Documentation

## 🔒 Production-Ready Authentication System

DeafAuth implements industry-standard security practices with deaf-first accessibility.

---

## ✅ OIDC/OpenID Connect Compliance

### Standards Implemented

- **OpenID Connect Core 1.0**: Full implementation of OIDC authentication flows
- **OAuth 2.0**: Authorization framework with PKCE (Proof Key for Code Exchange)
- **JWT (JSON Web Tokens)**: Secure token-based authentication using HS256/RS256

### OIDC Features

1. **Authorization Code Flow with PKCE**: Most secure flow for SPAs and mobile apps
2. **Token Management**: Access tokens, refresh tokens, and ID tokens
3. **Custom Claims**: Deaf-specific claims in JWT tokens
   - `deaf_identity`: Boolean indicating deaf user
   - `sign_languages`: Array of sign languages user knows
   - `accessibility_profile`: User's accessibility preferences
   - `communication_preferences`: Preferred communication methods

### Configuration

```typescript
// Example OIDC Provider Setup
const oidcProvider = createOIDCProvider({
  issuer: process.env.OIDC_ISSUER,
  clientId: process.env.OIDC_CLIENT_ID,
  clientSecret: process.env.OIDC_CLIENT_SECRET,
  redirectUri: process.env.OIDC_REDIRECT_URI,
  scope: 'openid email profile deaf_identity'
}, process.env.JWT_SECRET);

await oidcProvider.initialize();
```

---

## 📹 FFmpeg Video Authentication

### Overview

One-time sign language authentication using FFmpeg for video processing.

### Security Features

1. **Video Validation**:
   - Maximum duration: 30 seconds (configurable)
   - Maximum file size: 50MB (configurable)
   - Allowed formats: MP4, WebM, MOV

2. **Processing Pipeline**:
   - H.264 video compression (CRF 28)
   - AAC audio encoding (128kbps)
   - Fast start for streaming support

3. **Storage**:
   - Encrypted storage in Supabase
   - Signed URLs with 1-hour expiry
   - Automatic cleanup after 30 days or security rise

### Usage

```typescript
const videoAuthService = createVideoAuthService({
  maxDuration: 30,
  maxFileSize: 50 * 1024 * 1024,
  videoBucket: 'deafauth-videos'
});

// Process and store video
const metadata = await videoAuthService.processVideo(
  '/path/to/video.mp4',
  userId
);

// Retrieve video for verification
const signedUrl = await videoAuthService.getVideoUrl(userId, metadata.videoId);

// Delete after verification or security rise
await videoAuthService.deleteVideo(userId, metadata.videoId);
```

---

## 🗄️ Supabase Integration

### Custom Auth with Supabase

DeafAuth acts as a custom authentication provider on top of Supabase:

1. **Row Level Security (RLS)**: Enabled on all tables
2. **User Profiles**: Extended with deaf-specific fields
3. **Storage**: Secure video storage with bucket policies
4. **Real-time**: Subscription support for accessibility updates

### Database Schema

Key tables:
- `deafauth.users`: Core user data with accessibility profiles
- `deafauth.accessibility_profiles`: Detailed accessibility preferences
- `deafauth.visual_credentials`: Video authentication metadata
- `deafauth.user_verification`: Trust and verification scores
- `accessibility.service_logs`: Partner notification audit trail

### Supabase Auth Flow

```typescript
// 1. User signs in via DeafAuth OIDC
const authUrl = oidcProvider.getAuthorizationUrl();

// 2. After callback, create Supabase session
const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'custom',
  token: deafAuthToken
});

// 3. Access user data with RLS
const { data: profile } = await supabase
  .from('deafauth.users')
  .select('*')
  .eq('id', user.id)
  .single();
```

---

## 🦕 Deno Compatibility

### Runtime Support

DeafAuth supports multiple runtimes:
- **Node.js** 16+
- **Deno** 1.0+
- **Bun** 0.1+

### Deno Configuration

```bash
# Run with Deno
deno task dev

# Build for Deno
deno task build

# Test with Deno
deno task test
```

### Import Maps

Deno uses npm specifiers and ESM imports:

```json
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
    "express": "npm:express@^4.18.2",
    "jose": "https://deno.land/x/jose@v5.2.0/index.ts"
  }
}
```

---

## 🤝 Partner Integration

### PinkSync & 360 Magicians Communication

DeafAuth automatically notifies partner services when a deaf user authenticates.

### Partner Token

Special JWT token with limited scope for partner services:

```typescript
{
  "sub": "user_id",
  "deaf_user": true,
  "requires_accessibility": true,
  "partner_metadata": {
    "signLanguages": ["ASL", "BSL"],
    "accessibilityNeeds": {
      "requiresCaptions": true,
      "requiresVisualAlerts": true
    }
  },
  "aud": ["pinksync", "360magicians", "fibronrose"],
  "exp": 1234567890
}
```

### Partner Notifications

When a deaf user signs in:

1. DeafAuth retrieves user's accessibility profile
2. Creates partner token with deaf user information
3. Sends POST request to each partner endpoint
4. Partners adjust their UI/UX for accessibility
5. Notification logged for audit trail

### Adaptive Accessibility

Partners receive recommendations:

```json
{
  "recommendations": [
    {
      "type": "captions",
      "priority": "high",
      "message": "Enable real-time captions for all audio content"
    },
    {
      "type": "visual_alerts",
      "priority": "high",
      "message": "Use visual alerts instead of audio notifications"
    }
  ],
  "signLanguages": ["ASL"],
  "preferredCommunication": ["sign_language", "text"]
}
```

---

## 🔐 Security Best Practices

### 1. Token Security

- JWT tokens signed with HS256 or RS256
- Short expiration times (24h for user tokens, 1h for partner tokens)
- Secure token storage (httpOnly cookies recommended)
- Token refresh mechanism

### 2. Video Storage

- Videos encrypted at rest in Supabase Storage
- Signed URLs with short expiration (1 hour)
- Automatic cleanup of expired videos
- No public access to video bucket

### 3. API Security

- Helmet.js for HTTP security headers
- CORS configured for specific origins
- Rate limiting on authentication endpoints
- Request validation and sanitization

### 4. Data Privacy

- GDPR compliant
- User consent for accessibility data sharing
- Right to be forgotten implementation
- Data export capability

### 5. Compliance

- **WCAG 2.1 AAA**: Full accessibility compliance
- **Section 508**: Federal accessibility standards
- **FedRAMP**: Cloud security standards
- **HIPAA Ready**: Healthcare data protection

---

## 📊 Monitoring & Logging

### Audit Trail

All authentication events logged:
- Login attempts (success/failure)
- Video authentication events
- Partner notifications
- Accessibility preference changes
- Token issuance and verification

### Metrics

Track key security metrics:
- Failed authentication attempts
- Token verification failures
- Video processing errors
- Partner notification success rate

---

## 🚀 Deployment Checklist

### Pre-Production

- [ ] Configure environment variables
- [ ] Set up Supabase project and tables
- [ ] Create storage bucket for videos
- [ ] Configure OIDC provider
- [ ] Set JWT secret (min 32 characters)
- [ ] Configure CORS origins
- [ ] Set up rate limiting

### Security Review

- [ ] Review RLS policies
- [ ] Test video upload validation
- [ ] Verify token expiration
- [ ] Test partner notifications
- [ ] Review audit logs
- [ ] Penetration testing
- [ ] Accessibility audit

### Runtime

- [ ] Node.js/Deno properly configured
- [ ] FFmpeg installed and accessible
- [ ] SSL/TLS certificates configured
- [ ] Firewall rules configured
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

---

## 📖 API Reference

### Authentication Endpoints

```
POST /api/auth/oidc/authorize
  - Get OIDC authorization URL

POST /api/auth/oidc/callback
  - Handle OIDC callback

POST /api/auth/video/upload
  - Upload sign language video for authentication

GET /api/auth/verify
  - Verify current token

POST /api/auth/refresh
  - Refresh access token
```

### Accessibility Endpoints

```
GET /api/accessibility/profile
  - Get user accessibility profile

PUT /api/accessibility/preferences
  - Update accessibility preferences

GET /api/accessibility/recommendations
  - Get accessibility recommendations for partners
```

### Partner Endpoints

```
POST /api/partner/notify
  - Notify partners of deaf user authentication

GET /api/partner/token
  - Get partner-scoped token
```

---

## 🆘 Support

For security issues, contact: security@deafauth.mbtq.dev
For accessibility feedback: accessibility@deafauth.mbtq.dev

---

## 📄 License

MIT License - Built with 🤟 for the Deaf community

---

**Last Updated**: 2025-11-22
**Version**: 1.0.0
**Compliance**: OIDC 1.0, OAuth 2.0, WCAG 2.1 AAA
