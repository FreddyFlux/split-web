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
	let currentText = $state('');
	let isDeleting = $state(false);
	let isPaused = $state(false);
	let isWordGap = $state(false);
	let typingSpeed = 200; // milliseconds per character
	let pauseDuration = 1200; // pause when word is complete
	let wordGapDuration = 800; // pause between words

	const { staticWord, dynamicWord } = data.heroSections;

	function typeEffect() {
		const currentWord = dynamicWord[currentWordIndex];

		if (isWordGap) {
			// Do nothing during word gap
			return;
		} else if (isDeleting) {
			currentText = currentWord.substring(0, currentText.length - 1);
			if (currentText === '') {
				isDeleting = false;
				isWordGap = true;
				// After word gap duration, move to next word
				setTimeout(() => {
					isWordGap = false;
					currentWordIndex = (currentWordIndex + 1) % dynamicWord.length;
				}, wordGapDuration);
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
		<span class="dynamic-text">{currentText}</span>
	</h1>
</div>

<style>
	h1 {
		font-family: 'Ceraso', sans-serif;
		font-size: 8vw;
	}

	.cycling-text-container {
		margin-bottom: 2vh;
	}

	.cycling-text {
		margin-left: 15vw;
		width: 100vw;
	}

	.dynamic-text {
		display: inline-block;
		min-width: 1ch;
		border-right: 2px solid currentColor;
		animation: blink 0.75s step-end infinite;
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
</style>
