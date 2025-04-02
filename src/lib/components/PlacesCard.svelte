<script lang="ts">
	import Icon from '@iconify/svelte';
	import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

	interface PlacesCardProps {
		data: ProcessedPlaces[];
	}

	let { data }: PlacesCardProps = $props();

	// Base delay for the entire places section to start after headline and content
	const baseDelay = 300;
	// Delay between each place card - increased for more prominent staggering effect
	const cardDelay = 300;
</script>

<div class="places-card-grid">
	{#each data as place, index}
		<AnimateOnScroll
			animation="fade-up"
			duration={800}
			delay={baseDelay + cardDelay * index}
			easing="bounce"
		>
			<a href={`/${place.language}/places/${place.slug}`}>
				<div class="places-card">
					<img src={place.image} alt={place.name} class="places-card-image" />
					<div class="places-card-content">
						<h3 class="places-card-title">{place.name}</h3>
						<span class="places-card-location mb-m"><strong>{place.location}</strong></span>
						<div class="places-card-icon-container mt-s">
							{#each place.placeData as data}
								<span class="places-card-icon"
									><Icon icon={data.iconClass} width="24  " height="24" />{data.placeData}</span
								>
							{/each}
						</div>
					</div>
					<div class="places-card-link">
						<span class="places-card-link-text">Read More</span>
						<span class="places-card-link-text">
							<Icon icon="mdi:arrow-right" />
						</span>
					</div>
				</div>
			</a>
		</AnimateOnScroll>
	{/each}
</div>

<style>
	.places-card-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	.places-card {
		width: 100%;
		height: 100%;
		border-radius: 30px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.places-card:hover {
		transform: translateY(-5px);
	}

	.places-card-image {
		width: 100%;
		height: 250px;
		object-fit: cover;
	}

	.places-card-content {
		padding: 1.5rem;
	}

	.places-card-title {
		font-size: 2rem;
		font-weight: 600;
	}

	.places-card-location {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 6rem;
	}

	.places-card-icon-container {
		display: flex;
		justify-content: space-evenly;
		flex-direction: row;
		gap: 0.5rem;
	}

	.places-card-icon {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		font-size: 1.2rem;
	}

	.places-card-link {
		display: flex;
		justify-content: space-between;
		padding: 0 2rem 1rem 2rem;
	}

	.places-card-link-text {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		font-weight: 600;
	}
</style>
