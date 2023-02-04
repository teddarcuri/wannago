<script lang="ts">
	import { navigating } from '$app/stores';
	import ProgressBar from 'svelte-progress-bar';
	import { activeDestinationStore } from '$lib/stores/activeDestination';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '$lib/stores/activeInfoDisplay';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	let progress: ProgressBar;

	$: {
		if ($navigating) {
			const { from, to } = $navigating;

			console.log($navigating);
			// progress bar kick off
			if (progress) progress.start();

			if (from) {
				// Turn off edit location mode if on
				if (
					from.routeId === '/globe/destinations/[id]' &&
					$activeDestinationStore.editLocationMode
				) {
					activeDestinationStore.update(s => ({ ...s, editLocationMode: false }));
					activeInfoDisplayStore.update(() => ({
						status: ActiveInfoDisplayStatus.Normal,
						displayText: '',
					}));
				}
				// Clear any new location
				if (
					from.routeId === '/globe/destinations/[id]' &&
					$activeDestinationStore.newLocation
				) {
					activeDestinationStore.update(s => ({ ...s, newLocation: null }));
				}

				// Clear add waypoint active
				if (from.routeId === '/globe/destinations/[id]' && $addWaypointStore.active) {
					addWaypointStore.update(s => ({ ...s, active: false }));
					activeInfoDisplayStore.update(() => ({
						status: ActiveInfoDisplayStatus.Normal,
						displayText: '',
					}));
				}

				// turn off active desitnation delete mode
				if (
					from.routeId === '/globe/destinations/[id]' &&
					$activeDestinationStore.deleteMode
				) {
					activeDestinationStore.update(s => ({ ...s, deleteMode: false }));
				}
			}

			if (to) {
				// turn off add destination mode if visting a particular destination
				// to.routeId should include at least '/globe/destinations/[id]'
				if (to.routeId !== '/globe' && $addDestinationStore.active) {
					addDestinationStore.update(s => ({ ...s, active: false }));
				}
			}
		}

		if (!$navigating) {
			// progress bar end
			if (progress) progress.complete();
		}
	}
</script>

<ProgressBar bind:this={progress} />
