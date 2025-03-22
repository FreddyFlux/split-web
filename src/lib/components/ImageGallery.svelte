<script lang="ts">
	let { images } = $props<{ images: string[] }>();

	let currentIndex = $state(0);
	let isTransitioning = $state(false);
	let intervalId = $state<number | NodeJS.Timeout | null>(null);

	function nextImage() {
		if (isTransitioning) return;
		isTransitioning = true;
		currentIndex = (currentIndex + 1) % images.length;
		setTimeout(() => (isTransitioning = false), 300);
	}

	function previousImage() {
		if (isTransitioning) return;
		isTransitioning = true;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		setTimeout(() => (isTransitioning = false), 300);
	}

	function resetAutoAdvance() {
		if (intervalId) {
			clearInterval(intervalId);
		}
		intervalId = setInterval(nextImage, 5000);
	}

	// Auto-advance every 5 seconds
	$effect(() => {
		intervalId = setInterval(nextImage, 5000);
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
</script>

<div class="carousel">
	<div class="carousel-container">
		{#each images as image, i}
			<div class="slide" class:active={currentIndex === i}>
				<img src={image} alt="Carousel image {i + 1}" />
			</div>
		{/each}
	</div>

	<button
		class="nav-button prev"
		onclick={() => {
			previousImage();
			resetAutoAdvance();
		}}
		aria-label="Previous image"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>

	<button
		class="nav-button next"
		onclick={() => {
			nextImage();
			resetAutoAdvance();
		}}
		aria-label="Next image"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>

	<div class="dots">
		{#each images as _, i}
			<button
				class="dot"
				class:active={currentIndex === i}
				onclick={() => {
					if (currentIndex !== i) {
						isTransitioning = true;
						currentIndex = i;
						setTimeout(() => (isTransitioning = false), 300);
						resetAutoAdvance();
					}
				}}
				aria-label="Go to image {i + 1}"
			></button>
		{/each}
	</div>
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		height: 400px;
		overflow: hidden;
		border-radius: 8px;
	}

	.carousel-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.slide {
		position: absolute;
		width: 80%;
		height: 100%;
		opacity: 0;
		transition: all 300ms ease-in-out;
		transform: translateX(-50%);
		left: 50%;
	}

	.slide.active {
		opacity: 1;
		z-index: 2;
	}

	.slide:not(.active) {
		opacity: 0.5;
		z-index: 1;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
	}

	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		padding: 8px;
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.nav-button:hover {
		background: rgba(0, 0, 0, 0.7);
	}

	.nav-button.prev {
		left: 16px;
	}

	.nav-button.next {
		right: 16px;
	}

	.nav-button svg {
		width: 3.2rem;
		height: 3.2rem;
		fill: none;
	}

	.dots {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
		z-index: 3;
	}

	.dot {
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.5);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.dot.active {
		background: white;
	}
</style>
