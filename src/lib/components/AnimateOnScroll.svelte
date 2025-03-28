<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface AnimateProps {
		animation?:
			| 'fade-up'
			| 'fade-down'
			| 'fade-left'
			| 'fade-right'
			| 'zoom-in'
			| 'zoom-out'
			| 'slide-up'
			| 'slide-in'
			| 'blur-in'
			| 'flip-in';
		duration?: number; // in ms
		delay?: number; // in ms
		threshold?: number; // percentage of element visible
		once?: boolean; // only animate once
		startVisible?: boolean; // start with element visible
		easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'bounce';
		exitAnimation?: boolean; // whether to animate on exit
	}

	const {
		animation = 'fade-up',
		duration = 800,
		delay = 0,
		threshold = 0.2,
		once = false,
		startVisible = false,
		easing = 'ease-out',
		exitAnimation = true
	} = $props();

	let element: HTMLElement;
	let intersecting = $state(startVisible);
	let hasBeenVisible = $state(startVisible);
	let observer: IntersectionObserver;
	let previousY = $state(0);
	let direction = $state('');
	let resetTimer: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				const currentY = entry.boundingClientRect.y;

				// Determine scroll direction
				if (previousY > currentY) {
					direction = 'down';
				} else {
					direction = 'up';
				}
				previousY = currentY;

				// Set intersecting state
				if (entry.isIntersecting) {
					intersecting = true;
					hasBeenVisible = true;
				} else {
					intersecting = false;

					// Set a timer to reset the animation state when the element is fully out of view
					if (!once && hasBeenVisible && exitAnimation) {
						// Clear any existing timer
						if (resetTimer) {
							clearTimeout(resetTimer);
						}

						// Set a new timer to reset the animation after it completes
						resetTimer = setTimeout(
							() => {
								hasBeenVisible = false; // Reset so it will animate again
							},
							duration * 0.7 + delay
						); // Match the exit animation duration
					}
				}

				// If once is true and element has been visible, disconnect the observer
				if (once && hasBeenVisible && observer) {
					observer.unobserve(element);
				}
			},
			{
				threshold,
				// When the animation start (8%) and out (30%) should be triggered
				rootMargin: '8% 0px -30% 0px'
			}
		);

		observer.observe(element);
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}

		if (resetTimer) {
			clearTimeout(resetTimer);
		}
	});
</script>

<div
	bind:this={element}
	class="animate-on-scroll {animation} {intersecting ? 'visible' : ''} {!intersecting &&
	hasBeenVisible &&
	exitAnimation
		? 'exiting'
		: ''} {direction}"
	style="--duration: {duration}ms; --delay: {delay}ms; --easing: {easing};"
>
	<slot />
</div>

<style>
	.animate-on-scroll {
		opacity: 0;
		transition-duration: var(--duration);
		transition-timing-function: var(--easing);
		transition-delay: var(--delay);
		will-change: transform, opacity;
	}

	.animate-on-scroll.visible {
		opacity: 1;
		transform: none !important;
		filter: none !important;
	}

	/* Exit animations - apply the reverse of the entry animation */
	.animate-on-scroll.exiting.down {
		opacity: 0;
		transition-duration: calc(var(--duration) * 0.7);
	}

	.animate-on-scroll.exiting.up {
		opacity: 0;
		transition-duration: calc(var(--duration) * 0.7);
	}

	/* Animation variations */
	.fade-up {
		transform: translateY(40px);
	}

	.fade-up.exiting.up {
		transform: translateY(-40px);
	}

	.fade-down {
		transform: translateY(-40px);
	}

	.fade-down.exiting.up {
		transform: translateY(40px);
	}

	.fade-left {
		transform: translateX(-40px);
	}

	.fade-left.exiting.up {
		transform: translateX(40px);
	}

	.fade-right {
		transform: translateX(40px);
	}

	.fade-right.exiting.up {
		transform: translateX(-40px);
	}

	.zoom-in {
		transform: scale(0.92);
	}

	.zoom-in.exiting.up {
		transform: scale(0.92);
	}

	.zoom-out {
		transform: scale(1.08);
	}

	.zoom-out.exiting.up {
		transform: scale(1.08);
	}

	.slide-up {
		transform: translateY(100px);
	}

	.slide-up.exiting.up {
		transform: translateY(-100px);
	}

	.slide-in {
		transform: translateX(100px);
	}

	.slide-in.exiting.up {
		transform: translateX(-100px);
	}

	.blur-in {
		opacity: 0;
		filter: blur(10px);
	}

	.blur-in.exiting.up {
		opacity: 0;
		filter: blur(10px);
	}

	.flip-in {
		transform: perspective(400px) rotateX(10deg);
	}

	.flip-in.exiting.up {
		transform: perspective(400px) rotateX(-10deg);
	}

	/* Easing functions */
	[style*='--easing: ease'] {
		transition-timing-function: ease;
	}

	[style*='--easing: ease-in'] {
		transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
	}

	[style*='--easing: ease-out'] {
		transition-timing-function: cubic-bezier(0, 0, 0.58, 1);
	}

	[style*='--easing: ease-in-out'] {
		transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
	}

	[style*='--easing: linear'] {
		transition-timing-function: linear;
	}

	[style*='--easing: bounce'] {
		transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
</style>
