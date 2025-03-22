<script lang="ts">
	import Icon from '@iconify/svelte';

	interface HeroSectionProps {
		data: {
			heroSections: {
				staticWord: string;
				dynamicWord: string[];
				button: string;
				buttonLink: string[];
				ctaTitle: string;
				ctaDescription: string;
				language: string;
			};
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
			<a href="/">{link}</a>
		{/each}
	</div>
</div>

<style>
	.hero-cta-container {
		position: absolute;
		bottom: 4%;
		right: 2%;
		background-color: rgba(128, 167, 173, 0.85);
		border-radius: 30px;
		padding: 1vh 2vh;
		max-width: 17vw;
		max-height: 5vh;
		overflow: hidden;
		transition: max-height 0.6s ease-in-out;
		overflow: hidden;
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
		font-size: 1.2rem;
	}
</style>
