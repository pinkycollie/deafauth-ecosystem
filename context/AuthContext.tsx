

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session, User as SupabaseUser, Provider } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import * as api from '../services/api';
import { Role, User, AuthProviderType, UserUpdatePayload } from '../types';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (provider: AuthProviderType, credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (payload: UserUpdatePayload) => Promise<void>;
    mintDeafPass: () => Promise<{ success: boolean; message: string; txHash?: string; }>;
    submitIdea: (idea: string) => Promise<{ success: boolean; message: string; ideaId?: string; }>;
    resendVerificationEmail: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
    const displayName = supabaseUser.user_metadata?.full_name ||
                        supabaseUser.user_metadata?.name ||
                        supabaseUser.user_metadata?.display_name ||
                        supabaseUser.email ||
                        'New User';
    return {
        id: supabaseUser.id,
        displayName: displayName,
        email: supabaseUser.email || null,
        roles: supabaseUser.user_metadata?.roles || [Role.MEMBER],
        profileMeta: {
            preferredLanguage: supabaseUser.user_metadata?.preferred_language,
            walletAddress: supabaseUser.user_metadata?.wallet_address,
        },
        isVerified: !!supabaseUser.email_confirmed_at,
    };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // FIX: Correctly destructure useState to get both the state variable and the setter function.
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            const appUser = session?.user ? mapSupabaseUser(session.user) : null;
            setUser(appUser);
            setLoading(false);
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            const appUser = session?.user ? mapSupabaseUser(session.user) : null;
            setUser(appUser);
            if (_event !== 'INITIAL_SESSION') {
                setLoading(false);
            }
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const login = async (provider: AuthProviderType, credentials: any) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            switch (provider) {
                case AuthProviderType.EMAIL:
                    response = await supabase.auth.signInWithOtp({
                        email: credentials.email,
                        options: { emailRedirectTo: window.location.origin },
                    });
                    if (response.error) throw response.error;
                    break;
                
                case AuthProviderType.GOOGLE:
                case AuthProviderType.GITHUB:
                case AuthProviderType.AZURE:
                case AuthProviderType.ONEAUTH:
                    const providerName = provider;
                    const redirectURL = window.location.origin;
                    response = await supabase.auth.signInWithOAuth({
                        provider: providerName as Provider,
                        options: { redirectTo: redirectURL },
                    });
                    if (response.error) throw response.error;
                    break;
                
                case AuthProviderType.WALLET:
                case AuthProviderType.DEAF_AUTH:
                case AuthProviderType.PASSKEY:
                    throw new Error(`Provider "${provider}" is a demo feature and not implemented.`);
                    
                default:
                    throw new Error(`Provider ${provider} not supported.`);
            }
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
            console.error("Auth Error:", e);
        } finally {
            setLoading(false);
        }
    };
    
    const resendVerificationEmail = async () => {
        if (!user || !user.email) {
            const message = "No user email available to resend verification.";
            setError(message);
            throw new Error(message);
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: user.email,
                options: { emailRedirectTo: window.location.origin }
            });
            if (error) throw error;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setLoading(false);
    };

    const updateUser = async (payload: UserUpdatePayload) => {
        if (!user) throw new Error('Not authenticated');
        setLoading(true);
        setError(null);
        try {
            const updateData: { [key: string]: any; } = {};
            if (payload.displayName) {
                updateData.display_name = payload.displayName;
            }
            if (payload.profileMeta?.preferredLanguage !== undefined) {
                 updateData.preferred_language = payload.profileMeta.preferredLanguage;
            }

            const { data, error } = await supabase.auth.updateUser({ data: updateData });
            
            if (error) throw error;
            if (data.user) {
                setUser(mapSupabaseUser(data.user));
            }
        } catch (e: any) {
            setError(e.message);
            throw e; 
        } finally {
            setLoading(false);
        }
    };
    
    const mintDeafPass = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.mintDeafPass();
            return { success: true, ...result };
        } catch (e: any) {
            setError(e.message);
            return { success: false, message: e.message };
        } finally {
            setLoading(false);
        }
    };
    
    const submitIdea = async (idea: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.submitIdea(idea);
            return { success: true, ...result };
        } catch (e: any) {
            setError(e.message);
            return { success: false, message: e.message };
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        session,
        user,
        loading,
        // FIX: Propagate the error state through the context.
        error,
        login,
        logout,
        updateUser,
        mintDeafPass,
        submitIdea,
        resendVerificationEmail,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};