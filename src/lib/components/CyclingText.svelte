<script lang="ts">
	interface HeroSectionProps {
		data: {
			heroSections: {
				staticWord: string;
				dynamicWord: string[];
			};
		};
		lang: string;
	}
	let { data, lang }: HeroSectionProps = $props();

	let language = $state(lang);
	let currentWordIndex = $state(0);
	let currentText = $state('\u00A0'); // Initialize with a non-breaking space
	let isDeleting = $state(false);
	let isPaused = $state(false);
	let isWordGap = $state(false);
	let typingSpeed = 200; // milliseconds per character
	let pauseDuration = 1200; // pause when word is complete
	let wordGapDuration = 800; // pause between words

	const { staticWord, dynamicWord } = data.heroSections;

	// Get the longest word length for sizing the container
	let longestWordLength = $derived(Math.max(...dynamicWord.map((word) => word.length)));

	function typeEffect() {
		const currentWord = dynamicWord[currentWordIndex];

		if (isWordGap) {
			// Always keep a non-breaking space during word gap
			currentText = '\u00A0';
			return;
		} else if (isDeleting) {
			// If we're down to the last character, transition to word gap
			if (currentText.length <= 2) {
				// Account for the space we always keep
				isDeleting = false;
				isWordGap = true;
				currentText = '\u00A0'; // Keep a non-breaking space
				// After word gap duration, move to next word
				setTimeout(() => {
					isWordGap = false;
					currentWordIndex = (currentWordIndex + 1) % dynamicWord.length;
				}, wordGapDuration);
			} else {
				currentText = currentWord.substring(0, currentText.length - 1);
			}
		} else if (isPaused) {
			// Do nothing during pause
			return;
		} else {
			currentText = currentWord.substring(0, currentText.length + 1);
			if (currentText === currentWord) {
				isPaused = true;
				// After pause duration, start deleting
				setTimeout(() => {
					isPaused = false;
					isDeleting = true;
				}, pauseDuration);
			}
		}
	}

	// Start the typing effect when the component mounts
	$effect(() => {
		const interval = setInterval(typeEffect, typingSpeed);
		return () => clearInterval(interval);
	});
</script>

<div class="cycling-text-container">
	<h1 class="cycling-text">
		<span class="static-text">{staticWord}</span>
		<span class="dynamic-text" style="--word-length: {longestWordLength}ch;">{currentText}</span>
	</h1>
</div>

<style>
	h1 {
		font-family: 'Ceraso', sans-serif;
		font-size: 8vw; /* Base font size */
	}

	.cycling-text-container {
		margin-bottom: 2vh;
		width: 100%;
	}

	.cycling-text {
		margin-left: 15vw;
		width: 100vw;
	}

	.dynamic-text {
		display: inline-block;
		width: var(--word-length, 10ch); /* Use the longest word length as width */
		min-width: 8ch; /* Minimum width as fallback */
		min-height: 1em; /* Ensure minimum height */
		overflow-wrap: break-word; /* Handle long words */
		word-break: break-word; /* Additional word breaking control */
		border-right: 2px solid currentColor;
		animation: blink 0.75s step-end infinite;
		white-space: pre-wrap; /* Allow word wrapping */
		text-align: left; /* Keep text left-aligned in the container */
	}

	@keyframes blink {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: currentColor;
		}
	}

	/* Responsive styles */
	@media screen and (max-width: 1200px) {
		.cycling-text {
			margin-left: 10vw;
		}

		h1 {
			font-size: 7.6vw; /* 5% smaller than base */
		}
	}

	@media screen and (max-width: 900px) {
		h1 {
			font-size: 7.2vw; /* 5% smaller than 1200px */
		}

		.cycling-text {
			margin-left: 0;
			text-align: left;
			width: 100%;
		}

		.static-text {
			display: block;
			text-align: left;
		}

		.dynamic-text {
			display: inline-block;
			margin-left: 0;
			text-align: left;
			position: relative;
			border-right: none; /* Remove the cursor border */
			animation: none; /* Remove the blinking animation */
			width: 100%; /* Full width on mobile */
		}
	}

	@media screen and (max-width: 600px) {
		h1 {
			font-size: 6.8vw; /* 5% smaller than 900px */
		}

		.cycling-text {
			margin-left: 0;
			width: 100%;
			padding-left: 10%;
		}

		.static-text {
			padding-left: 0;
		}

		.dynamic-text {
			padding-left: 0;
		}

		.cycling-text-container {
			margin-bottom: 1.5vh;
		}
	}

	@media screen and (max-width: 400px) {
		h1 {
			font-size: 6.5vw; /* 5% smaller than 600px */
		}

		.static-text {
			padding-left: 0;
		}

		.dynamic-text {
			padding-left: 0;
		}

		.cycling-text-container {
			margin-bottom: 1vh;
		}
	}
</style>
