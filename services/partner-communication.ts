/**
 * Partner Communication Service
 * Communicates deaf user status to PinkSync, 360 Magicians, and other partners
 * Enables adaptive accessibility coordination across the ecosystem
 */

import { supabase } from './supabase';
import { OIDCProvider } from './oidc';

export interface DeafUserProfile {
  userId: string;
  isDeaf: boolean;
  signLanguages: string[];
  communicationPreferences: {
    preferred: string[];
    requiresVisualAlerts: boolean;
    requiresCaptions: boolean;
    requiresInterpreter: boolean;
  };
  accessibilitySettings: {
    visualInterface: boolean;
    adaptiveContent: boolean;
    minimalMode: boolean;
  };
  // Fibronrose trust score - a verification score from the Fibronrose trust system
  // Range: 0-100, higher scores indicate more verified/trusted users
  fibronroseScore?: number;
}

export interface PartnerNotification {
  userId: string;
  partner: string;
  action: string;
  deafUserProfile: DeafUserProfile;
  timestamp: Date;
}

export class PartnerCommunicationService {
  private oidcProvider: OIDCProvider;
  private partners: Map<string, string> = new Map([
    ['pinksync', 'https://pinksync.io/api/v1/deafauth/notify'],
    ['360magicians', 'https://360magicians.com/api/v1/accessibility/update'],
    ['fibronrose', 'https://fibronrose.mbtq.dev/api/v1/trust/sync'],
  ]);

  constructor(oidcProvider: OIDCProvider) {
    this.oidcProvider = oidcProvider;
  }

  /**
   * Get comprehensive deaf user profile
   */
  async getDeafUserProfile(userId: string): Promise<DeafUserProfile | null> {
    try {
      // Query user profile from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('accessibility_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError || !profile) {
        console.error('Failed to fetch deaf user profile:', profileError);
        return null;
      }

      // Get user verification details
      const { data: verification } = await supabase
        .from('user_verification')
        .select('*')
        .eq('user_id', userId)
        .single();

      const deafUserProfile: DeafUserProfile = {
        userId,
        isDeaf: profile.hearing_tech_used || profile.screen_reader_used || false,
        signLanguages: profile.language_preferences?.signLanguages || [],
        communicationPreferences: {
          preferred: profile.preferred_communication_methods || ['ASL'],
          requiresVisualAlerts: profile.visual_accommodation_needs?.alerts || true,
          requiresCaptions: profile.visual_accommodation_needs?.captions || true,
          requiresInterpreter: profile.interpretation_preferences?.required || false,
        },
        accessibilitySettings: {
          visualInterface: true,
          adaptiveContent: true,
          minimalMode: profile.cognitive_support_needs?.minimalMode || false,
        },
        fibronroseScore: verification?.verification_score || 0,
      };

      return deafUserProfile;
    } catch (error) {
      console.error('Error getting deaf user profile:', error);
      return null;
    }
  }

  /**
   * Notify partners about deaf user authentication
   * This allows partners to adapt their interfaces and services
   */
  async notifyPartners(userId: string, action: string): Promise<void> {
    const profile = await this.getDeafUserProfile(userId);
    
    if (!profile) {
      console.error('Cannot notify partners: user profile not found');
      return;
    }

    // Generate partner token
    const partnerToken = await this.oidcProvider.createPartnerToken(
      userId,
      profile.isDeaf,
      {
        signLanguages: profile.signLanguages,
        accessibilityNeeds: profile.communicationPreferences,
      }
    );

    // Notify each partner service
    const notifications = Array.from(this.partners.entries()).map(
      async ([partner, endpoint]) => {
        try {
          const notification: PartnerNotification = {
            userId,
            partner,
            action,
            deafUserProfile: profile,
            timestamp: new Date(),
          };

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${partnerToken}`,
              'X-DeafAuth-Version': '1.0',
            },
            body: JSON.stringify(notification),
          });

          if (!response.ok) {
            console.error(`Failed to notify ${partner}:`, response.statusText);
          } else {
            console.log(`Successfully notified ${partner} about user ${userId}`);
          }

          // Log notification in database
          await this.logPartnerNotification(notification);
        } catch (error) {
          console.error(`Error notifying partner ${partner}:`, error);
        }
      }
    );

    await Promise.all(notifications);
  }

  /**
   * Log partner notification for audit trail
   */
  private async logPartnerNotification(notification: PartnerNotification): Promise<void> {
    try {
      const { error } = await supabase
        .from('service_logs')
        .insert({
          user_id: notification.userId,
          service_type: notification.partner,
          communication_mode: notification.deafUserProfile.communicationPreferences.preferred[0],
          interaction_timestamp: notification.timestamp.toISOString(),
          additional_metadata: {
            action: notification.action,
            isDeaf: notification.deafUserProfile.isDeaf,
          },
        });

      if (error) {
        console.error('Failed to log partner notification:', error);
      }
    } catch (error) {
      console.error('Error logging partner notification:', error);
    }
  }

  /**
   * Update accessibility preferences and notify partners
   */
  async updateAccessibilityPreferences(
    userId: string,
    preferences: Partial<DeafUserProfile['accessibilitySettings']>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('accessibility_profiles')
        .update({
          visual_accommodation_needs: preferences,
          last_updated: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Failed to update accessibility preferences:', error);
        return false;
      }

      // Notify partners of the update
      await this.notifyPartners(userId, 'accessibility_preferences_updated');
      return true;
    } catch (error) {
      console.error('Error updating accessibility preferences:', error);
      return false;
    }
  }

  /**
   * Register new partner service
   */
  registerPartner(name: string, endpoint: string): void {
    this.partners.set(name, endpoint);
    console.log(`Registered partner: ${name} at ${endpoint}`);
  }

  /**
   * Adaptive middleware to adjust response based on deaf user profile
   * Adds accessibility metadata to responses for frontend adaptation
   */
  adaptiveAccessibilityMiddleware() {
    return async (req: any, res: any, next: any) => {
      const originalJson = res.json.bind(res);
      
      res.json = async (data: any) => {
        // Add accessibility context if user is deaf
        if (req.deafUser?.isDeaf) {
          const enhancedData = {
            ...data,
            _accessibility: {
              deafUser: true,
              visualMode: true,
              minimalAdaptive: req.deafUser.accessibilityNeeds?.minimalMode || false,
              signLanguages: req.deafUser.signLanguages || [],
              recommendations: {
                enableCaptions: true,
                useVisualAlerts: true,
                provideSignLanguageSupport: true,
              },
            },
          };
          return originalJson(enhancedData);
        }
        
        return originalJson(data);
      };
      
      next();
    };
  }

  /**
   * Get accessibility recommendations for partners
   */
  async getAccessibilityRecommendations(userId: string): Promise<any> {
    const profile = await this.getDeafUserProfile(userId);
    
    if (!profile) {
      return {
        recommendations: [],
        message: 'User profile not found',
      };
    }

    return {
      recommendations: [
        profile.communicationPreferences.requiresCaptions && {
          type: 'captions',
          priority: 'high',
          message: 'Enable real-time captions for all audio content',
        },
        profile.communicationPreferences.requiresVisualAlerts && {
          type: 'visual_alerts',
          priority: 'high',
          message: 'Use visual alerts instead of audio notifications',
        },
        profile.communicationPreferences.requiresInterpreter && {
          type: 'interpreter',
          priority: 'medium',
          message: 'Consider providing sign language interpreter support',
        },
        profile.accessibilitySettings.minimalMode && {
          type: 'minimal_ui',
          priority: 'medium',
          message: 'Use minimal, distraction-free interface',
        },
      ].filter(Boolean),
      signLanguages: profile.signLanguages,
      preferredCommunication: profile.communicationPreferences.preferred,
    };
  }
}

/**
 * Factory function to create partner communication service
 */
export function createPartnerCommunicationService(
  oidcProvider: OIDCProvider
): PartnerCommunicationService {
  return new PartnerCommunicationService(oidcProvider);
}
