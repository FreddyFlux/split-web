<script lang="ts">
	interface SanityProps {
		data: {
			experiences: ProcessedExperiences[];
			experienceSections: ProcessedExperienceSection[];
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="experiences-section container">
	<h2 class="experiences-title mb-m">{data.experienceSections[0].experienceHeadline}</h2>
	<p class="experiences-description">
		{data.experienceSections[0].experienceContent}
	</p>

	<div class="experiences-container">
		{#each data.experiences as experience}
			<a
				href="/{data.experienceSections[0].language}/experience/{experience.slug}"
				class="experience-card"
			>
				<h3 class="experience-title">{experience.experienceHeadline}</h3>
				<img class="experience-image" src={experience.image} alt={experience.experienceHeadline} />
			</a>
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
		display: grid;
		grid-template-columns: 30% 40% 30%;
		grid-template-rows: repeat(1, 1fr);
		gap: 2rem;
		margin-top: 4rem;
	}

	.experience-card {
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
