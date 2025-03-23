<script lang="ts">
	import {
		AboutSection,
		PlacesSection,
		ExperiencesSection,
		CyclingText,
		HeroCta,
		HospitalitySection
	} from '$components';

	import heroImg from '$assets/img/streetView.jpg';

	interface SanityProps {
		data: {
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

<div class="hero-container">
	<CyclingText {data} {lang} />
	<div class="img-container">
		<!-- <div class="img-overlay"></div> -->
		<img src={heroImg} alt="hero" class="hero-img" />
		<HeroCta {data} {lang} />
	</div>
</div>

<AboutSection {data} />

<PlacesSection {data} />

<ExperiencesSection {data} />

<HospitalitySection {data} />

<style>
	.img-container {
		width: 90%;
		position: relative;
		overflow: hidden;
	}

	/* .img-overlay {
		position: absolute;
		border-radius: 30px;
		width: 100%;
		height: 100%;
		background-image: -webkit-gradient(
			linear,
			left top,
			right bottom,
			from(var(--color-turquoise)),
			to(var(--color-turquoise-dark))
		);
		background-image: linear-gradient(
			to right bottom,
			var(--color-turquoise),
			var(--color-turquoise-dark)
		);
		opacity: 0.42;
	} */

	.hero-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 30px;
	}

	.hero-container {
		padding-top: 12vh;
		height: 88vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
</style>
