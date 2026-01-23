import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://baomvwtdcrjmnswvrzdv.supabase.co';
const supabaseKey = 'sb_publishable_HsEzPwyahI-WGHHE74X9Ig_BD-IHEtj';

export const supabase = createClient(supabaseUrl, supabaseKey);
