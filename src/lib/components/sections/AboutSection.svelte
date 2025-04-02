<script lang="ts">
	import splitfjord from '$assets/img/splitfjord.jpg';
	import fredrik from '$assets/img/fredrik-profile.jpg';
	import leana from '$assets/img/leana-profile.jpg';
	import pebbles from '$assets/img/pebbles.jpg';
	import AnimateOnScroll from '$lib/components/AnimateOnScroll.svelte';

	interface AboutSectionProps {
		data: {
			aboutSections: ProcessedAboutSection;
		};
	}

	let { data }: AboutSectionProps = $props();

	const { aboutTitle, aboutDescription, whyUsTitle, whyUsDescription, linkList } =
		data.aboutSections;

	// Base delay for the about section
	const baseDelay = 70;
	// Delay between each element
	const elementDelay = 130;
</script>

<section class="about-section container">
	<AnimateOnScroll animation="fade-right" duration={800} easing="bounce">
		<h2 class="about-title about-title-left mb-m">{aboutTitle}</h2>
	</AnimateOnScroll>

	<div class="about-container">
		<AnimateOnScroll animation="fade-right" duration={800} delay={baseDelay} easing="bounce">
			<div class="about-img-container">
				<img src={splitfjord} alt="splitfjord" class="about-img" />
			</div>
		</AnimateOnScroll>

		<div class="about-text-container">
			<AnimateOnScroll
				animation="fade-right"
				duration={800}
				delay={baseDelay + elementDelay}
				easing="bounce"
			>
				<h3 class="about-text-title mb-m">Fredrik & Leana</h3>
			</AnimateOnScroll>

			<AnimateOnScroll
				animation="fade-right"
				duration={800}
				delay={baseDelay + elementDelay * 2}
				easing="bounce"
			>
				<div class="about-text-img-container mb-m">
					<div class="about-text-img-link-container">
						<img src={fredrik} alt="fredrik" class="about-text-img" />
					</div>
					<div class="about-text-img-link-container">
						<img src={leana} alt="leana" class="about-text-img" />
					</div>
				</div>
			</AnimateOnScroll>

			{#each aboutDescription as description}
				<AnimateOnScroll
					animation="fade-right"
					duration={800}
					delay={baseDelay + elementDelay * 3}
					easing="bounce"
				>
					<p class="about-text">
						{description}
					</p>
				</AnimateOnScroll>
			{/each}
		</div>
	</div>

	<AnimateOnScroll animation="fade-right" duration={800} easing="bounce">
		<h2 class="about-title about-title-right mb-m mt-l text-align-right mt-l">{whyUsTitle}</h2>
	</AnimateOnScroll>

	<div class="about-container">
		<div class="about-text-container">
			{#each whyUsDescription as description}
				<AnimateOnScroll animation="fade-right" duration={800} delay={baseDelay} easing="bounce">
					<p class="about-text">
						{description}
					</p>
				</AnimateOnScroll>
			{/each}

			<AnimateOnScroll
				animation="fade-right"
				duration={800}
				delay={baseDelay + elementDelay}
				easing="bounce"
			>
				<div class="about-text-img-container mt-m">
					<div class="about-text-img-link-container">
						<a href={`${linkList[0].linkUrl}`} class="about-text-img-link">
							<img src={linkList[0].image} alt={linkList[0].name} class="about-text-img" />
							<p class="about-text-img-link-text mt-xs">{linkList[0].name}</p>
						</a>
					</div>
					<div class="about-text-img-link-container">
						<a href={`${linkList[1].linkUrl}`} class="about-text-img-link">
							<img src={linkList[1].image} alt={linkList[1].name} class="about-text-img" />
							<p class="about-text-img-link-text mt-xs">{linkList[1].name}</p>
						</a>
					</div>
				</div>
			</AnimateOnScroll>
		</div>

		<AnimateOnScroll
			animation="fade-right"
			duration={800}
			delay={baseDelay + elementDelay * 2}
			easing="bounce"
		>
			<div class="about-img-container">
				<img src={pebbles} alt="pebbles" class="about-img" />
			</div>
		</AnimateOnScroll>
	</div>
</section>

<style>
	.about-section {
		padding: 10vh 0;
	}

	.about-container {
		display: flex;
		flex-direction: row;
		flex: 50% 50%;
		gap: 4rem;
		padding: 0 4rem;
	}

	.about-img-container {
		width: 100%;
		position: relative;
	}

	.about-img {
		width: 100%;
		height: auto;
		border-radius: 20px;
	}

	.about-text-container {
		width: 100%;
	}

	.about-text {
		line-height: 1.5;
	}

	.about-text-title {
		text-align: center;
	}

	.about-text-img-container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 4rem;
	}

	.about-text-img-link-container {
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.about-text-img-link-text {
		font-size: 1.8rem;
		line-height: 1.5;
		text-align: center;
	}

	.about-text-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 900px;
		transition: transform 0.33s ease-in-out;
	}

	.about-text-img:hover {
		transform: scale(1.05);
	}

	/* Responsive styles */
	@media screen and (max-width: 1200px) {
		.about-container {
			gap: 3rem;
		}
	}

	@media screen and (max-width: 900px) {
		.about-section {
			padding: 8vh 0;
		}

		.about-container {
			flex-direction: column;
			gap: 3rem;
		}

		.about-img {
			margin: 0 auto;
			width: 70%;
		}

		.about-text {
			width: 50%;
			margin: 0 auto;
		}

		.about-title-left {
			margin-left: 10vh;
		}

		.about-title-right {
			margin-right: 10vh;
		}

		.about-text-img {
			width: 100%;
			height: 100%;
		}

		.about-text-img-container {
			margin: 4rem auto;
			gap: 3rem;
			width: 60%;
		}

		.about-text-img-link-container {
			width: 30%;
		}
	}

	@media screen and (max-width: 600px) {
		.about-section {
			padding: 6vh 0;
		}

		.about-container:nth-child(4) {
			flex-direction: column-reverse;
		}

		.about-text-img-container {
			gap: 2rem;
		}

		.about-text-img-link-container {
			width: 35%;
		}

		.about-img {
			border-radius: 20px;
		}
	}

	@media screen and (max-width: 400px) {
		.about-text-img-container {
			flex-direction: column;
			align-items: center;
			gap: 3rem;
		}

		.about-text-img-link-container {
			width: 60%;
		}
	}
</style>
