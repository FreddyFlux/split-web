<script lang="ts">
	import Icon from '@iconify/svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface SanityProps {
		data: {
			nav: ProcessedNavbar;
			experience: ProcessedExperiences[];
		};
		lang: string;
	}

	let { data, lang }: SanityProps = $props();

	const { experienceHeadline, content, image } = data.experience[0];

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}

	// Create refs for animation targets
	let headerRef: HTMLHeadingElement;
	let imageRef: HTMLImageElement;
	let contentContainer: HTMLDivElement;

	onMount(() => {
		// Set initial states for header and image
		gsap.set([headerRef, imageRef], { autoAlpha: 0, y: 30 });

		// Get all direct children of the content container
		const contentElements = Array.from(contentContainer.children);

		// Set initial state for content elements
		gsap.set(contentElements, { autoAlpha: 0, y: 30 });

		// Create animation timeline
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Animate header first with a slight delay to start
		tl.to(headerRef, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2);

		// Then animate the image with slight overlap
		tl.to(imageRef, { autoAlpha: 1, y: 0, duration: 1 }, 0.5);

		// Then animate each content block in sequence with staggered timing
		tl.to(
			contentElements,
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.15 // Adds staggered delay between elements
			},
			0.8
		);
	});
</script>

<Navbar {data} {lang} />

<div class="experience-container container">
	<div class="experience-header">
		<div class="experience-header-data">
			<h1 bind:this={headerRef} class="animation-element">{experienceHeadline}</h1>
		</div>
	</div>

	<div class="experience-image-container">
		<img
			bind:this={imageRef}
			class="experience-image animation-element"
			src={image}
			alt={experienceHeadline}
		/>
	</div>

	<div class="place-content" bind:this={contentContainer}>
		{#each content as block}
			{#if block.type === 'text'}
				<svelte:element this={getTagFromStyle(block.style)} class="animation-element"
					>{block.textToRender}</svelte:element
				>
			{:else}
				<img class="content-image animation-element" src={block.url} alt="" />
			{/if}
		{/each}
	</div>
</div>

<Footer {data} />

<style>
	.experience-container {
		margin-top: 5vh;
		padding-top: 9rem;
		padding-bottom: 9rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.experience-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.experience-header-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.experience-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.experience-image {
		width: 40%;
		height: 20%;
		object-fit: cover;
		border-radius: 1rem;
	}

	.place-content {
		margin-top: 5vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Pre-hide elements for smooth animation */
	.animation-element {
		opacity: 0;
		visibility: hidden;
	}
</style>
