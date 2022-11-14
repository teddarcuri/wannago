import { supabaseClient } from '$lib/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { data } = await supabaseClient.from('destinations').select('*').eq('name', params.slug);

	if (data) {
		return {
			destination: data[0]
		};
	}

	throw error(404, 'Could not find destination data');
}
