import { createClient } from '@supabase/supabase-js';
import { type Database } from '../src/index';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Use dummy values if env vars are not set to prevent app from crashing.
  // A real app should throw an error here.
  console.warn('Supabase environment variables are not set. Using fallback values.');
}

export const supabase = createClient<Database>(
  SUPABASE_URL || 'https://hhgmgvhrmebkiscphirp.supabase.co', 
  SUPABASE_ANON_KEY || 'sb_publishable_A1YuXRS3Gg-GOgmq2p8dmg_sXi_ouEc', 
  {
    auth: { persistSession: true, detectSessionInUrl: true },
  }
);