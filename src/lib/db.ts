import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
// TODO: Create TS types -> https://www.youtube.com/watch?v=7CqlTU9aOR4
export const supabaseClient = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);
