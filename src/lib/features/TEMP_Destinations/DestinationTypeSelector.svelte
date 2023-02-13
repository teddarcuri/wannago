<script lang="ts">
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { userDestinationsStore } from '@/lib/stores/userDestinations';
	import { onMount } from 'svelte';

	interface DestinationType {
		id: number;
		name: string;
		icon: string;
	}

	let destinationTypes = $userDestinationsStore.destinationTypes;

	export let onSelect: (type: number) => void = () => {};
	export let activeTypeId = 1;
	$: selectedType = destinationTypes.find(t => t.id === activeTypeId);

	let showDropdown = false;

	// on mount set the destinationTypeId to the first type
	onMount(() => {
		addDestinationStore.update(s => ({ ...s, destinationTypeId: selectedType?.id ?? 0 }));
	});

	// set type, close drop, call CB
	const setActivetype = (type: DestinationType) => {
		showDropdown = false;
		onSelect(type);
	};
</script>

<div class="group root relative">
	{#if selectedType?.id}
		<button
			class:active={showDropdown}
			on:click|preventDefault={() => (showDropdown = !showDropdown)}
			class="toggle flex p-3"
			type="button"
			><img src={selectedType.icon} class="w-[34px] h-[34px] opacity-80" />
			<!-- <span class="text-xl ml-3 mt-1 group-hover:opacity-90 opacity-0">&#9662;</span> -->
		</button>
	{/if}
	{#if showDropdown}
		<div
			class="dropdown 
        	flex flex-row flex-wrap absolute
       	 bg-black bg-opacity-90 p-3
        	rounded-sm top-[77px] left-0 
        	w-[550px]"
		>
			{#each destinationTypes as type}
				<div class="p-2 self-stretch w-[33.3333%]">
					<button
						type="button"
						on:click|preventDefault={() => {
							setActivetype(type);
						}}
						class:active={type.id === selectedType.id}
					>
						<img src={type.icon} />
						<p class="text-xs">{type.title}</p>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.root {
		@apply pr-2;

		button.toggle.active {
			@apply border-zinc-600 bg-black rounded-2xl;

			span {
				transform: rotate(180deg);
				opacity: 0.5;
			}
		}
	}

	button.toggle {
		@apply border-2 rounded-xl border-transparent ml-2;

		img {
			filter: drop-shadow(2px 2px 0px rgb(0 0 0 / 1));
		}

		&:hover {
			@apply bg-stone-900;
		}

		span {
			transition: all ease 0.2s;
		}
	}

	.dropdown {
		@apply border border-zinc-800 rounded-md;
		z-index: 99;
		// animation: barberpole 42s linear infinite;
		// background: repeating-linear-gradient(120deg, #000, #000 11px, #222 11px, #222 12px);
		background-size: 200%;
		overflow: hidden;

		button {
			@apply uppercase rounded-md 
            p-3 w-full
            text-zinc-400
            tracking-widest text-xs
            font-semibold
            inline-flex items-center
            hover:border-zinc-600
            hover:bg-gray-800
            hover:text-zinc-200
            active:bg-black;

			&.active {
				@apply text-zinc-200 bg-zinc-800;

				img {
					@apply opacity-100;
				}
			}

			&:hover {
				img {
					@apply opacity-100;
				}
			}

			img {
				@apply opacity-50 h-[24px] w-[24px] mr-3;
			}
		}
	}
</style>
