<script lang="ts">
	import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

	interface SanityProps {
		data: {
			hospitalitySections: ProcessedHospitalitySection[];
			hospitality: ProcessedHospitality[];
		};
	}

	let { data }: SanityProps = $props();

	// Base delay for the hospitality cards
	const baseDelay = 300;
	// Delay between each hospitality card
	const cardDelay = 200;
</script>

<section class="hospitality-section container" id="hospitality">
	<h2 class="hospitality-title mb-s">{data.hospitalitySections[0].hospitalityHeadline}</h2>
	<p class="hospitality-description mb-m">{data.hospitalitySections[0].hospitalityContent}</p>

	<div class="hospitality-container">
		{#each data.hospitality as hospitality, index}
			<div class="hospitality-animation-wrapper">
				<AnimateOnScroll
					animation="fade-left"
					duration={800}
					delay={baseDelay + cardDelay * index}
					easing="bounce"
				>
					<a
						href="/{data.hospitalitySections[0].language}/cuisine/{hospitality.slug}"
						class="hospitality-card"
					>
						<h3 class="hospitality-title mb-s">{hospitality.hospitalityHeadline}</h3>
						<div class="hospitality-image-container">
							<img
								class="hospitality-image"
								src={hospitality.image}
								alt={hospitality.hospitalityHeadline}
							/>
						</div>
					</a>
				</AnimateOnScroll>
			</div>
		{/each}
	</div>
</section>

<style>
	.hospitality-section {
		padding: 9vh 0;
	}

	.hospitality-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	/* Make sure the animation wrapper takes up the full grid cell space */
	.hospitality-animation-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		min-height: 100%;
	}

	.hospitality-title {
		font-weight: 600;
	}

	.hospitality-image-container {
		width: 100%;
		height: 100%;
		flex-grow: 1;
	}

	.hospitality-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
	}

	.hospitality-card {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		transition: transform 0.2s ease-in-out;
		height: 100%;
		width: 100%;
	}

	.hospitality-card:hover {
		transform: translateY(-5px);
	}
</style>
