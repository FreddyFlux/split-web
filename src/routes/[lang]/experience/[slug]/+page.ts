import sanityClient, { processExperiencesEntries } from '$lib/utils/experienceSanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { processNavbarEntries } from '$lib/utils/navbarSanity';

export const load: PageLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency
	depends('routes:[lang]:experience:[slug]');

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawExperiences: SanityExperiences[] = await sanityClient.fetch(
		`*[_type == "experiences" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawExperiences.length !== 1) {
		throw error(404, 'Project not found');
	}

	const experience = processExperiencesEntries(rawExperiences);

	return {
		experience,
		nav
	};
};
