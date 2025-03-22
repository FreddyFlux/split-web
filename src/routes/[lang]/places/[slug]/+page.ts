import sanityClient, { processPlacesEntries } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;
	const slug = params.slug;

	const rawPlaces: SanityPlaces[] = await sanityClient.fetch(
		`*[_type == "places" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawPlaces.length !== 1) {
		throw error(404, 'Project not found');
	}

	const place = processPlacesEntries(rawPlaces);

	return {
		place
	};
};
