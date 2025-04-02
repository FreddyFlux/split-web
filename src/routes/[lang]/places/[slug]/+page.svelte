<script lang="ts">
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import Icon from '@iconify/svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface SanityProps {
		data: {
			nav: ProcessedNavbar;
			place: ProcessedPlaces[];
		};
		lang: string;
	}

	let { data, lang }: SanityProps = $props();

	const {
		placesTitle,
		placesDescription,
		name,
		location,
		slug,
		image,
		dateStartSeason,
		dateEndSeason,
		imageGallery,
		content,
		amenities,
		placeData,
		urlLinks,
		language
	} = data.place[0];

	let images = $state([...imageGallery]);

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}

	// Create refs for animation targets
	let headerRef: HTMLDivElement;
	let galleryRef: HTMLDivElement;
	let contentContainer: HTMLDivElement;

	onMount(() => {
		// Set initial states for header elements
		gsap.set(headerRef, { autoAlpha: 0, y: 30 });

		// Set initial state for gallery
		gsap.set(galleryRef, { autoAlpha: 0, y: 30 });

		// Get all direct children of the content container
		const contentElements = Array.from(contentContainer.children);

		// Set initial state for content elements
		gsap.set(contentElements, { autoAlpha: 0, y: 30 });

		// Create animation timeline
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Animate header first with a slight delay to start
		tl.to(headerRef, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2);

		// Then animate the gallery with slight overlap
		tl.to(galleryRef, { autoAlpha: 1, y: 0, duration: 1 }, 0.5);

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

<div class="place-container container">
	<div class="place-header animation-element" bind:this={headerRef}>
		<div class="place-header-data">
			<h1>{name}</h1>
			<p>{location}</p>
		</div>
		<div class="place-header-icons">
			{#each placeData as data}
				<div class="place-header-icon">
					<Icon icon={data.iconClass} width="32" height="32"></Icon>
					<p class="icon-text">{data.placeData}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="animation-element" bind:this={galleryRef}>
		<ImageGallery {images} />
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
	.place-container {
		margin-top: 5vh;
		padding-top: 9rem;
		padding-bottom: 9rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.place-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.place-header-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.place-header-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}

	.place-header-icon {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.icon-text {
		margin-top: 5px;
		font-size: 1.5rem;
		font-weight: 600;
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
