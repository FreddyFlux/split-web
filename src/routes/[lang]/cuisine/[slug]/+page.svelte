<script lang="ts">
	import Icon from '@iconify/svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface SanityProps {
		data: {
			nav: ProcessedNavbar;
			hospitality: ProcessedHospitality[];
		};
		lang: string;
	}
	let { data, lang }: SanityProps = $props();

	const { hospitalityHeadline, content, image } = data.hospitality[0];

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

<div class="hospitality-container container">
	<div class="hospitality-header">
		<div class="hospitality-header-data">
			<h1 bind:this={headerRef} class="animation-element">{hospitalityHeadline}</h1>
		</div>
	</div>

	<div class="hospitality-image-container">
		<img
			bind:this={imageRef}
			class="hospitality-image animation-element"
			src={image}
			alt={hospitalityHeadline.split(':')[0]}
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
	.hospitality-container {
		margin-top: 5vh;
		padding-top: 9rem;
		padding-bottom: 9rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hospitality-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.hospitality-header-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hospitality-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hospitality-image {
		width: 40%;
		height: 20%;
		object-fit: cover;
		border-radius: 1rem;
	}

	.place-content {
		margin-top: 5vh;
		padding: 0 15vw 0 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.place-content h4 {
		font-size: 3rem;
		font-weight: 600;
	}

	/* Pre-hide elements for smooth animation */
	.animation-element {
		opacity: 0;
		visibility: hidden;
	}
</style>
