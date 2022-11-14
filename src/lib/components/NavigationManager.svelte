<script>
	import { navigating } from '$app/stores';

	$: if ($navigating) {
		const {
			to: {
				routeId,
				params: { slug }
			}
		} = $navigating;

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
