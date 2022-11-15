<script>
	import { page, navigating } from '$app/stores';

	console.log('ROUTE ID: ', $page.routeId);
	$: if ($navigating) {
		const {
			to: {
				routeId,
				params: { slug }
			}
		} = $navigating;

		console.log('navigating: ', $navigating);
		if (routeId === '/globe/destinations/[slug]') {
			// View Destination
			console.log('DESTINATION SLUG: ', slug);
		}

		if (routeId === '/globe') {
			// Globe Page
			console.log('NAVIGATED TO GLOBE PAGE');
		}
	}
</script>
