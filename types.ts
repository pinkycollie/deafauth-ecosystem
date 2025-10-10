
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
}

export enum AuthProviderType {
  WALLET = 'wallet',
  DEAF_AUTH = 'deaf_auth',
  EMAIL = 'email',
  PASSKEY = 'passkey',
  FIBONROSE = 'fibonrose',
  PERSIST_ID = 'persist_id',
  GOOGLE = 'google',
  AZURE = 'azure',
  ONEAUTH = 'oneauth',
}