import { supabaseClient } from '$lib/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */

export async function load({ params }) {
	const { data } = await supabaseClient
		.from('destinations')
		.select(
			`
            id,
            name,
            coordinates,
            description,
            cover_photo (
                id,
                public_url,
                bucket_path
            )
        `,
		)
		.eq('id', params.id);

	const { data: waypoints } = await supabaseClient
		.from('waypoints')
		.select(
			`
            id,
            name,
            coordinates,
            hex
        `,
		)
		.eq('parent_destination_id', params.id);

	const destination = {
		...data[0],
		waypoints,
	};

	if (data) {
		return {
			destination,
		};
	}

	throw error(404, 'Could not find destination data');
}
