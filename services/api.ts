import { type User, type UserUpdatePayload } from '../types';
import { supabase } from './supabase';

const API_BASE_URL = '/api/v1'; // This would be the base URL for your actual backend API.

/**
 * A wrapper for the fetch API that gets the current Supabase session token
 * to authorize requests to external APIs.
 * @param url The API endpoint to call (e.g., '/ideas/submit').
 * @param options The standard RequestInit options for fetch.
 * @returns The JSON response from the API.
 */
const apiFetch = async (url: string, options: RequestInit = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            // The onAuthStateChange listener in AuthContext should handle session errors.
            // Throw an error to stop the current operation.
            throw new Error('Your session is invalid or has expired. Please sign in again.');
        }
        const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle responses with no content
    if (response.status === 204) {
        return null;
    }

    return response.json();
};


// --- PROTECTED API CALLS (to your custom backend) ---

export const mintDeafPass = async (): Promise<{ message: string, txHash: string }> => {
    console.log('[API] Minting DeafAuth Pass');
    // MOCK: This is a mock response. In a real app, this would hit your backend.
    await new Promise(resolve => setTimeout(resolve, 1500));
    return Promise.resolve({
      message: 'PersistID minted successfully!',
      txHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    });
};

export const submitIdea = async (idea: string): Promise<{ message:string, ideaId: string }> => {
    console.log(`[API] Submitting idea`);
    // MOCK: This is a mock response.
    await new Promise(resolve => setTimeout(resolve, 1000));
    const ideaContent = JSON.parse(idea);
    return Promise.resolve({
      message: 'Idea submitted successfully!',
      ideaId: `idea-${Date.now()}`
    });
};