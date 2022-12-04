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

	console.log('DESTINATION DATA -------- ', data);

	if (data) {
		return {
			destination: data[0],
		};
	}

	throw error(404, 'Could not find destination data');
}
