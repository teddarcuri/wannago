// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}

	// Supabase stuff
	interface UserSession {
		user: import('@supabase/supabase-js').User;
		accessToken?: string;
	}

	interface Locals extends UserSession {
		serverClient: import('@supabase/supabase-js').SupabaseClient;
		error: import('@supabase/supabase-js').ApiError;
	}

	interface Session extends UserSession {}
}

declare module 'mapbox-gl/dist/mapbox-gl.js';
