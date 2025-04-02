<script lang="ts">
	import {
		AboutSection,
		PlacesSection,
		ExperiencesSection,
		CyclingText,
		HeroCta,
		HospitalitySection,
		AnimateOnScroll,
		Navbar,
		Footer
	} from '$components';

	import heroImg from '$assets/img/streetView.jpg';

	interface SanityProps {
		data: {
			nav: ProcessedNavbar;
			heroSections: ProcessedHeroSection;
			aboutSections: ProcessedAboutSection;
			language: string;
			places: ProcessedPlaces[];
			placesSections: ProcessedPlacesSection[];
			experienceSections: ProcessedExperienceSection[];
			experiences: ProcessedExperiences[];
			hospitalitySections: ProcessedHospitalitySection[];
			hospitality: ProcessedHospitality[];
		};
		lang: string;
	}

	let { data, lang }: SanityProps = $props();

	let language = $state(lang);
</script>

<Navbar {data} {lang} />

<div class="hero-container">
	<AnimateOnScroll
		animation="fade-down"
		duration={1200}
		easing="ease-out"
		exitAnimation={true}
		once={true}
	>
		<CyclingText {data} {lang} />
	</AnimateOnScroll>

	<div class="img-container">
		<!-- <div class="img-overlay"></div> -->
		<AnimateOnScroll
			animation="zoom-in"
			duration={1000}
			delay={300}
			easing="ease-out"
			exitAnimation={true}
			once={true}
		>
			<img src={heroImg} alt="hero" class="hero-img" />
			<HeroCta {data} {lang} />
		</AnimateOnScroll>
	</div>
</div>

<AnimateOnScroll
	animation="fade-up"
	threshold={0.15}
	duration={900}
	easing="ease-out"
	exitAnimation={true}
	once={false}
>
	<AboutSection {data} />
</AnimateOnScroll>

<AnimateOnScroll
	animation="slide-in"
	threshold={0.15}
	delay={200}
	duration={1000}
	easing="ease-out"
	exitAnimation={true}
	once={false}
>
	<PlacesSection {data} />
</AnimateOnScroll>

<AnimateOnScroll
	animation="fade-right"
	threshold={0.15}
	delay={200}
	duration={900}
	easing="ease-out"
	exitAnimation={true}
	once={false}
>
	<ExperiencesSection {data} />
</AnimateOnScroll>

<AnimateOnScroll
	animation="blur-in"
	threshold={0.15}
	delay={200}
	duration={1050}
	easing="ease-out"
	exitAnimation={true}
	once={false}
>
	<HospitalitySection {data} />
</AnimateOnScroll>

<Footer {data} />

<style>
	.img-container {
		display: flex;
		justify-content: center;
		width: 90%;
		position: relative;
		overflow: hidden;
	}

	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 30px;
	}

	.hero-container {
		padding-top: 12vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}
</style>
