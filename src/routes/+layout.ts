import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';
import { userDestinationsStore } from '@/lib/stores/userDestinations';

let limit = 500;

export const load: LayoutLoad = async event => {
	const { session } = await getSupabase(event);

	try {
		const { data: destinations } = await supabaseClient
			.from('destinations')
			.select(
				`
                id,
                name,
                coordinates,
                description,
				type_id,
                images!destinations_cover_photo_fkey (
                    id,
                    public_url,
                    bucket_path
                )
            `,
			)
			.range(0, limit);
		userDestinationsStore.update(s => ({ ...s, destinations }));
	} catch (error) {
		console.log(error);
	}

	// select all destination types
	try {
		const { data: destinationTypes } = await supabaseClient
			.from('destination_types')
			.select('*');
		userDestinationsStore.update(s => ({ ...s, destinationTypes }));
	} catch (error) {
		console.log(error);
	}

	return {
		session,
	};
};
