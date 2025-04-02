<script lang="ts">
	import Icon from '@iconify/svelte';

	interface HeroSectionProps {
		data: {
			heroSections: ProcessedHeroSection;
		};
		lang: string;
	}

	let { data, lang }: HeroSectionProps = $props();

	const { staticWord, dynamicWord, ctaTitle, ctaDescription, button, buttonLink } =
		data.heroSections;
</script>

<div class="hero-cta-container bs-l">
	<div class="hero-cta-header">
		<h3>{ctaTitle}</h3>
		<Icon icon="circum:square-chev-down" width="32" height="32"></Icon>
	</div>
	<p>{ctaDescription}</p>
	<div class="hero-cta-links">
		{#each buttonLink as link}
			<a href={link.url}>{link.urlDescription} &rarr;</a>
		{/each}
	</div>
</div>

<style>
	.hero-cta-container {
		position: absolute;
		bottom: 4%;
		right: 2%;
		background-color: rgba(128, 167, 173, 0.85);
		border-radius: 20px;
		padding: 1vh 2vh;
		max-width: 28vw;
		max-height: 7vh;
		overflow: hidden;
		transition: max-height 0.6s ease-in-out;
		overflow: hidden;
	}

	/* Media query for 1200px - 10% wider */
	@media (max-width: 1200px) {
		.hero-cta-container {
			max-width: 28.8vw; /* 28vw * 1.1 */
		}
	}

	/* Media query for 900px - 20% longer */
	@media (max-width: 900px) {
		.hero-cta-container {
			max-width: 34.4vw; /* 28vw * 1.2 - 20% wider */
		}
	}

	/* Media query for 600px - 30% longer */
	@media (max-width: 600px) {
		.hero-cta-container {
			max-width: 42vw; /* 28vw * 1.3 - 30% wider */
		}
	}

	@media (max-width: 400px) {
		.hero-cta-container {
			max-width: 48vw; /* 28vw * 1.3 - 30% wider */
		}
	}

	.hero-cta-container:hover {
		max-height: 120vh;
	}

	.hero-cta-header {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.hero-cta-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 2.2rem;
	}
</style>
