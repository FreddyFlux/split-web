import sanityClient, { processHospitalityEntries } from '$lib/utils/hospitalitySanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;
	const slug = params.slug;

	const rawHospitality: SanityHospitality[] = await sanityClient.fetch(
		`*[_type == "hospitality" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawHospitality.length !== 1) {
		throw error(404, 'Project not found');
	}

	const hospitality = processHospitalityEntries(rawHospitality);

	return {
		hospitality
	};
};
