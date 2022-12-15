import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';
import { userDestinationsStore } from '@/lib/stores/userDestinations';

export const load: LayoutLoad = async event => {
	const { session } = await getSupabase(event);

	const { error, data: destinations } = await supabaseClient.from('destinations').select(`
                id,
                name,
                coordinates,
                description,
                cover_photo (
                    id,
                    public_url,
                    bucket_path
                )
            `);

	if (error) return console.error(error);
	userDestinationsStore.update(() => ({ destinations }));
	return {
		session,
	};
};
