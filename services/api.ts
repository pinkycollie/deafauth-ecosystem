// Fix: AuthProviderType is an enum used as a value, so it must be imported directly, not as a type.
import { AuthProviderType, type User } from '../types';
import { Role } from '../types';

// --- MOCK DATABASE ---
const mockUser: User = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  displayName: 'Alex signing',
  email: 'alex.doe@example.com',
  roles: [Role.MEMBER, Role.CREATOR],
  profileMeta: {
    preferredLanguage: 'ASL',
    walletAddress: '0x1234...5678',
  },
};

// --- MOCK API LOGIC ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const createJwt = (payload: object, secret: string, expiresIn: string): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const durationSeconds = parseInt(expiresIn, 10);
  const expiry = Date.now() + (durationSeconds * 1000);
  const data = { ...payload, exp: expiry };
  return `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(data))}.${btoa(secret)}`;
};

const verifyJwt = (token: string, secret: string): object => {
    try {
        const [, payloadB64] = token.split('.');
        if (!payloadB64) throw new Error('Invalid token format');
        const payload = JSON.parse(atob(payloadB64));
        if (payload.exp < Date.now()) {
            throw new Error('Token expired');
        }
        return payload;
    } catch (e) {
        if (e instanceof Error && e.message === 'Token expired') {
            throw e; // re-throw specific error
        }
        throw new Error('Invalid token'); // General failure for other parsing errors
    }
};

// --- AUTH FLOW ---

export const login = async (provider: AuthProviderType, data: any): Promise<{ accessToken: string; refreshToken: string }> => {
  console.log(`[API MOCK] Starting login with ${provider}`, data);
  await delay(1000);

  if (provider === AuthProviderType.EMAIL && data.email === 'fail@example.com') {
    throw new Error('This email address is blocked.');
  }
  
  if (provider === AuthProviderType.EMAIL) {
    console.log(`[API MOCK] Verifying MFA code: ${data.mfaCode}`);
    if (data.mfaCode === '000000') {
        throw new Error('Invalid verification code.');
    }
  }

  // Short-lived access token (5s) for testing, longer refresh token (30s)
  const accessToken = createJwt({ sub: mockUser.id, roles: mockUser.roles }, 'access-secret', '5s');
  const refreshToken = createJwt({ sub: mockUser.id }, 'refresh-secret', '30s');

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  console.log('[API MOCK] Login successful, tokens issued.');
  return { accessToken, refreshToken };
};

export const revokeSession = async (): Promise<{ message: string }> => {
    console.log('[API MOCK] Revoking session');
    await delay(500);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('[API MOCK] Session revoked.');
    return { message: 'Session revoked successfully' };
};

// --- REFRESH LOGIC ---

// Using a promise to handle concurrent requests during token refresh
let refreshTokenPromise: Promise<string> | null = null;

const refreshToken = async (): Promise<string> => {
    const token = localStorage.getItem('refreshToken');
    if (!token) {
        console.error('[API MOCK] No refresh token available.');
        throw new Error('Not Authenticated');
    }
    
    try {
        await delay(500); // Simulate network latency for refresh
        verifyJwt(token, 'refresh-secret');
        console.log('[API MOCK] Refresh token is valid, issuing new access token.');
        const newAccessToken = createJwt({ sub: mockUser.id, roles: mockUser.roles }, 'access-secret', '5s');
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (err) {
        console.error('[API MOCK] Refresh token is invalid or expired. Logging out.');
        await revokeSession(); // Clear all tokens on failure
        throw new Error('Session expired. Please log in again.');
    }
};

const getRefreshedToken = (): Promise<string> => {
    if (!refreshTokenPromise) {
        console.log('[API MOCK] Initiating token refresh.');
        refreshTokenPromise = refreshToken().finally(() => {
            // Reset promise after completion to allow future refreshes
            refreshTokenPromise = null;
        });
    } else {
        console.log('[API MOCK] Token refresh already in progress, waiting for it to complete...');
    }
    return refreshTokenPromise;
};

// API call wrapper to handle token expiration and automatic refresh
const apiCall = async <T>(apiLogic: () => Promise<T>): Promise<T> => {
    try {
        return await apiLogic();
    } catch (error: any) {
        if (error.message === 'Token expired') {
            console.log('[API MOCK] Access token expired. Attempting refresh.');
            try {
                await getRefreshedToken();
                console.log('[API MOCK] Retrying original request with new token.');
                return await apiLogic(); // Retry original call
            } catch (refreshError) {
                console.error('[API MOCK] Failed to refresh token, propagating error.', refreshError);
                throw refreshError;
            }
        }
        // Re-throw other errors (e.g., 'Not Authenticated', 'Invalid Token')
        throw error;
    }
};


// --- PROTECTED API CALLS ---

// Helper to check for token and verify it, throwing specific errors
const requireAuth = (): void => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Not Authenticated');
    }
    verifyJwt(token, 'access-secret'); // This will throw 'Token expired' or 'Invalid token'
};


export const getMe = async (): Promise<User> => {
    return apiCall(async () => {
        console.log('[API MOCK] Fetching /me');
        await delay(500);
        requireAuth();
        console.log('[API MOCK] /me successful.');
        return mockUser;
    });
};

export const mintDeafPass = async (): Promise<{ message: string, txHash: string }> => {
    return apiCall(async () => {
        console.log('[API MOCK] Minting DeafAuth Pass');
        await delay(2000);
        requireAuth();
        console.log('[API MOCK] Minting successful.');
        return {
            message: 'DeafAuth Pass minted successfully!',
            txHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
        };
    });
};

export const submitIdea = async (idea: string): Promise<{ message: string, ideaId: string }> => {
    return apiCall(async () => {
        console.log(`[API MOCK] Submitting idea: "${idea}"`);
        await delay(1200);
        requireAuth();
        console.log('[API MOCK] Idea submission successful.');
        return {
            message: 'Your idea has been recorded.',
            ideaId: `idea_${Date.now()}`
        };
    });
};