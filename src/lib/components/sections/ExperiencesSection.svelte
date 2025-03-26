<script lang="ts">
	import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

	interface SanityProps {
		data: {
			experiences: ProcessedExperiences[];
			experienceSections: ProcessedExperienceSection[];
		};
	}

	let { data }: SanityProps = $props();

	// Base delay for the entire experiences section
	const baseDelay = 300;
	// Delay between each experience card
	const cardDelay = 300;
</script>

<section class="experiences-section container" id="experiences">
	<h2 class="experiences-title mb-m">{data.experienceSections[0].experienceHeadline}</h2>
	<p class="experiences-description">
		{data.experienceSections[0].experienceContent}
	</p>

	<div class="experiences-container">
		{#each data.experiences as experience, index}
			<AnimateOnScroll
				animation="slide-up"
				duration={800}
				delay={baseDelay + cardDelay * index}
				easing="bounce"
			>
				<a
					href="/{data.experienceSections[0].language}/experience/{experience.slug}"
					class="experience-card"
				>
					<h3 class="experience-title">{experience.experienceHeadline}</h3>
					<img
						class="experience-image"
						src={experience.image}
						alt={experience.experienceHeadline}
					/>
				</a>
			</AnimateOnScroll>
		{/each}
	</div>
</section>

<style>
	.experiences-section {
		padding: 9vh 0;
	}

	.experiences-title {
		font-weight: 600;
	}

	.experiences-description {
		font-weight: 400;
		width: 67%;
	}

	.experiences-container {
		display: flex;
		gap: 2rem;
		margin-top: 4rem;
	}

	.experience-card {
		flex: 1;
		width: 100%;
		height: 100%;
		background-color: #f0f0f0;
		padding: 1.5rem;
		border-radius: 20px;
		transition: transform 0.3s ease;
		text-decoration: none;
		color: inherit;
		display: block;
		cursor: pointer;
	}

	.experience-card:hover {
		transform: translateY(-5px);
	}

	.experience-title {
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.experience-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
	}
</style>
