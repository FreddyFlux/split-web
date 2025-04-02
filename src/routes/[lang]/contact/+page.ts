import sanityClient, {
	processContactCtaEntries,
	processContactPeopleEntries,
	processContactFormEntries
} from '$lib/utils/contactSanity';
import { processNavbarEntries } from '$lib/utils/navbarSanity';

import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const lang = params.lang;

	const rawNavbar: SanityNavbar[] = await sanityClient.fetch(
		`*[_type == "navbar" && language == $lang]`,
		{ lang }
	);

	if (rawNavbar.length !== 1) {
		throw error(404, 'Page not found');
	}
	const nav = processNavbarEntries(rawNavbar)[0];

	const rawContactCta: SanityContactCta[] = await sanityClient.fetch(
		`*[_type == "contactCta" && language == $lang]`,
		{ lang }
	);

	if (rawContactCta.length !== 1) {
		throw error(404, 'Page not found');
	}

	const contactCta = processContactCtaEntries(rawContactCta)[0];

	const rawContactPeople: SanityContactPeople[] = await sanityClient.fetch(
		`*[_type == "contactPeople" && language == $lang]`,
		{ lang }
	);

	const contactPeople = processContactPeopleEntries(rawContactPeople);

	const rawContactForm: SanityContactForm[] = await sanityClient.fetch(
		`*[_type == "contactForm" && language == $lang]`,
		{ lang }
	);

	if (rawContactForm.length !== 1) {
		throw error(404, 'Page not found');
	}

	const contactForm = processContactFormEntries(rawContactForm)[0];

	return {
		contactCta,
		contactPeople,
		contactForm,
		nav
	};
};
