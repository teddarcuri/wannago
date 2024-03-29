import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';
import { userDestinationsStore } from '@/lib/stores/userDestinations';
import { get } from 'svelte/store';
import auth from '$lib/stores/auth';

let limit = 500;

export const load: LayoutLoad = async event => {
	const { session } = await getSupabase(event);

	// Setup user profile + user
	if (session) {
		const { user } = session;

		const { data: userProfile } = await supabaseClient
			.from('profiles')
			.select('*')
			.eq('id', session.user.id)
			.single();

		auth.update(s => ({ ...s, userProfile, user }));

		// Get all user destinations
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
				.order('name', { ascending: true })
				// where user id matches session user id
				.eq('user_id', session.user.id)
				.range(0, limit);
			userDestinationsStore.update(s => ({ ...s, hasFetched: true, destinations }));
		} catch (error) {
			console.log(error);
		}

		// select all destination types
		if (!get(userDestinationsStore).destinationTypes.length) {
			try {
				const { data: destinationTypes } = await supabaseClient
					.from('destination_types')
					.select('*')
					.order('id', { ascending: true });
				userDestinationsStore.update(s => ({ ...s, destinationTypes }));
			} catch (error) {
				console.log(error);
			}
		}
	}

	return {
		session,
	};
};
