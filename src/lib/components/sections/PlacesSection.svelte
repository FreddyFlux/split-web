<script lang="ts">
	import { PlacesCard } from '$components';

	interface SanityProps {
		data: {
			places: ProcessedPlaces[];
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="places-section container">
	<h2 class="places-title">{data.places[0].placesTitle}</h2>
	<div class="places-description-container">
		<p class="places-description">{data.places[0].placesDescription}</p>
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
