import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';
import { userDestinationsStore } from '@/lib/stores/userDestinations';

export const load: LayoutLoad = async event => {
	const { session } = await getSupabase(event);

	const { data: types } = await supabaseClient.from('destination_types').select('*');
	const typeId = types?.find(t => t.name === 'primary').id ?? 1;
	const { error, data: destinations } = await supabaseClient
		.from('destinations')
		.select(
			`
                id,
                name,
                coordinates,
                description,
                images!destinations_cover_photo_fkey (
                    id,
                    public_url,
                    bucket_path
                )
            `,
		)
		.eq('type_id', typeId);

	if (error) return console.error(error);
	userDestinationsStore.update(() => ({ destinations }));
	return {
		session,
	};
};
