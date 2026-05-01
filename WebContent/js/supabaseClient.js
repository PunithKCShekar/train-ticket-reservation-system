import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cztenfsxtgxhzshhpzzg.supabase.co'
const supabaseAnonKey = 'sb_publishable_Fj7xwztVaTNDwqNgCgHRMQ_TD5hdbmP'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
