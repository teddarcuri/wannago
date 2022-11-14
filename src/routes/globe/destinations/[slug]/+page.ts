import { supabaseClient } from '$lib/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	console.log('PARAMS: ', params);
	const { data } = await supabaseClient.from('destinations').select('*').eq('name', params.slug);

	if (data) {
		console.log('DATA: ', data[0]);
		return {
			destination: data[0]
		};
	}

	throw error(404, 'Not found');
}
