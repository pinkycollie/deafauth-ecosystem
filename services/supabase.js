"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var SUPABASE_URL = process.env.SUPABASE_URL;
var SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Use dummy values if env vars are not set to prevent app from crashing.
    // A real app should throw an error here.
    console.warn('Supabase environment variables are not set. Using fallback values.');
}
exports.supabase = (0, supabase_js_1.createClient)(SUPABASE_URL || 'https://hhgmgvhrmebkiscphirp.supabase.co', SUPABASE_ANON_KEY || 'sb_publishable_A1YuXRS3Gg-GOgmq2p8dmg_sXi_ouEc', {
    auth: { persistSession: true, detectSessionInUrl: true },
});
