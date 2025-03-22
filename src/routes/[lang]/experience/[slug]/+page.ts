import sanityClient, { processExperiencesEntries } from '$lib/utils/experienceSanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;
	const slug = params.slug;

	const rawExperiences: SanityExperiences[] = await sanityClient.fetch(
		`*[_type == "experiences" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawExperiences.length !== 1) {
		throw error(404, 'Project not found');
	}

	const experience = processExperiencesEntries(rawExperiences);

	return {
		experience
	};
};
