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
		<h2 class="about-title mb-m">{aboutTitle}</h2>
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

			<AnimateOnScroll
				animation="fade-right"
				duration={800}
				delay={baseDelay + elementDelay * 3}
				easing="bounce"
			>
				<p class="about-text">
					{aboutDescription}
				</p>
			</AnimateOnScroll>
		</div>
	</div>

	<AnimateOnScroll animation="fade-right" duration={800} easing="bounce">
		<h2 class="about-title mb-m mt-l text-align-right mt-l">{whyUsTitle}</h2>
	</AnimateOnScroll>

	<div class="about-container">
		<div class="about-text-container">
			<AnimateOnScroll animation="fade-right" duration={800} delay={baseDelay} easing="bounce">
				<p class="about-text">
					{whyUsDescription}
				</p>
			</AnimateOnScroll>

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
	}

	.about-img-container {
		width: 100%;
		position: relative;
	}

	.about-img {
		border-radius: 30px;
	}

	.about-text-container {
		width: 100%;
	}

	.about-text {
		font-size: 1.8rem;
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
</style>
