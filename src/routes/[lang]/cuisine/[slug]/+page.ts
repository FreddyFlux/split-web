import sanityClient, { processHospitalityEntries } from '$lib/utils/hospitalitySanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { processNavbarEntries } from '$lib/utils/navbarSanity';

export const load: PageLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency
	depends('routes:[lang]:cuisine:[slug]');

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawHospitality: SanityHospitality[] = await sanityClient.fetch(
		`*[_type == "hospitality" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawHospitality.length !== 1) {
		throw error(404, 'Project not found');
	}

	const hospitality = processHospitalityEntries(rawHospitality);

	return {
		hospitality,
		nav
	};
};
