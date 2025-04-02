import sanityClient, { processPlacesEntries } from '$lib/utils/placeSanity';
import { processNavbarEntries } from '$lib/utils/navbarSanity';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency
	depends('routes:[lang]:places:[slug]');

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawPlaces: SanityPlaces[] = await sanityClient.fetch(
		`*[_type == "places" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawPlaces.length !== 1) {
		throw error(404, 'Project not found');
	}

	const place = processPlacesEntries(rawPlaces);

	return {
		place,
		nav
	};
};
