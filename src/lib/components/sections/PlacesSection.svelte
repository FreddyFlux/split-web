<script lang="ts">
	import { PlacesCard } from '$components';
	import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

	interface SanityProps {
		data: {
			places: ProcessedPlaces[];
			placesSections: ProcessedPlacesSection[];
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="places-section container" id="places">
	<AnimateOnScroll animation="fade-up" duration={800} easing="ease-out">
		<h2 class="places-title">{data.placesSections[0].placesHeadline}</h2>
	</AnimateOnScroll>

	<div class="places-description-container">
		<AnimateOnScroll animation="fade-up" duration={800} delay={200} easing="ease-out">
			<p class="places-description">{data.placesSections[0].placesContent}</p>
		</AnimateOnScroll>
	</div>

	<PlacesCard data={data.places} />
</section>

<style>
	.places-section {
		padding-top: 3vh;
	}

	.places-title {
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.places-description-container {
		width: 67.5%;
		margin-bottom: 2rem;
	}

	.places-description {
		font-size: 1.8rem;
		line-height: 1.5;
	}
</style>
