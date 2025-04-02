import sanityClient, { processHospitalityEntries } from '$lib/utils/hospitalitySanity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency so the data will refresh when needed
	depends('routes:[lang]:cuisine:[slug]');

	// Fetch hospitality data from Sanity
	const rawHospitality: SanityHospitality[] = await sanityClient.fetch(
		`*[_type == "hospitality" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawHospitality.length !== 1) {
		return {}; // Let the page handle the error
	}

	const hospitality = processHospitalityEntries(rawHospitality);
	const item = hospitality[0];

	// Extract the first paragraph from content for description if available
	let description = '';
	const firstTextBlock = item.content.find((block) => block.type === 'text');
	if (firstTextBlock && firstTextBlock.type === 'text') {
		description = firstTextBlock.textToRender;
	}

	// Extract SEO data from the hospitality item
	return {
		// Signal to parent layouts that this layout has its own SEO data
		__seo_from_child: true,
		seo: {
			title: item.hospitalityHeadline,
			description: description,
			keywords: item.amenities?.join(', ') || '',
			ogTitle: item.hospitalityHeadline,
			ogDescription: description,
			ogImage: item.image,
			ogType: 'article',
			ogUrl: '', // Will be filled by layout.svelte with the current URL
			canonical: '', // Will be filled by layout.svelte with the current URL
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: item.hospitalityHeadline,
				description: description,
				image: item.image,
				author: item.author,
				datePublished: item.createdAt
			}
		}
	};
};
