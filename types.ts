

export enum Role {
  GUEST = 'guest',
  MEMBER = 'member',
  CREATOR = 'creator',
  ADMIN = 'admin',
  MAGICIAN = 'magician',
}

export interface User {
  id: string;
  displayName: string;
  email: string | null;
  roles: Role[];
  profileMeta: {
    preferredLanguage?: string;
    walletAddress?: string;
  };
  isVerified: boolean;
}

export interface UserUpdatePayload {
  displayName?: string;
  profileMeta?: {
    preferredLanguage?: string;
  };
}

export enum AuthProviderType {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
  // FIX: Add missing provider types to resolve compilation errors.
  WALLET = 'wallet',
  DEAF_AUTH = 'deaf_auth',
  PASSKEY = 'passkey',
  AZURE = 'azure',
  ONEAUTH = 'zoho',
}