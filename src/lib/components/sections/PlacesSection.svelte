<script lang="ts">
	import { PlacesCard } from '$components';

	interface SanityProps {
		data: {
			places: ProcessedPlaces[];
			placesSections: ProcessedPlacesSection[];
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="places-section container" id="places">
	<h2 class="places-title">{data.placesSections[0].placesHeadline}</h2>
	<div class="places-description-container">
		<p class="places-description">{data.placesSections[0].placesContent}</p>
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
