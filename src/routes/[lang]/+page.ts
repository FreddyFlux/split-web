import sanityClient, {
	processHeroEntries,
	processHeroSectionEntries,
	processPlacesEntries
} from '$lib/utils/sanity';

import {
	processHospitalityEntries,
	processHospitalitySectionEntries
} from '$lib/utils/hospitalitySanity';

import {
	processExperienceSectionEntries,
	processExperiencesEntries
} from '$lib/utils/experienceSanity';

import { processAboutSectionEntries } from '$lib/utils/aboutSanity';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;

	const rawHeroes: SanityHero[] = await sanityClient.fetch(
		`*[_type == "hero" && language == $lang]`,
		{ lang }
	);

	if (rawHeroes.length !== 1) {
		throw error(404, 'Project not found');
	}

	const hero = processHeroEntries(rawHeroes)[0];

	const rawHeroSections: SanityHeroSection[] = await sanityClient.fetch(
		`*[_type == "heroSection" && language == $lang]`,
		{ lang }
	);

	const heroSections = processHeroSectionEntries(rawHeroSections)[0];

	const rawAboutSections: SanityAboutSection[] = await sanityClient.fetch(
		`*[_type == "aboutSection" && language == $lang]`,
		{ lang }
	);

	const aboutSections = processAboutSectionEntries(rawAboutSections)[0];

	const rawPlaces: SanityPlaces[] = await sanityClient.fetch(
		`*[_type == "places" && language == $lang]`,
		{ lang }
	);

	const places = processPlacesEntries(rawPlaces);

	const rawExperiences: SanityExperiences[] = await sanityClient.fetch(
		`*[_type == "experiences" && language == $lang]`,
		{ lang }
	);

	const rawExperienceSections: SanityExperienceSection[] = await sanityClient.fetch(
		`*[_type == "experienceSection" && language == $lang]`,
		{ lang }
	);

	const experienceSections = processExperienceSectionEntries(rawExperienceSections);

	const rawHospitality: SanityHospitality[] = await sanityClient.fetch(
		`*[_type == "hospitality" && language == $lang]`,
		{ lang }
	);

	const hospitality = processHospitalityEntries(rawHospitality);

	const rawHospitalitySections: SanityHospitalitySection[] = await sanityClient.fetch(
		`*[_type == "hospitalitySection" && language == $lang]`,
		{ lang }
	);

	const hospitalitySections = processHospitalitySectionEntries(rawHospitalitySections);

	const experiences = processExperiencesEntries(rawExperiences);
	return {
		hero,
		heroSections,
		aboutSections,
		places,
		experiences,
		experienceSections,
		hospitality,
		hospitalitySections
	};
};
