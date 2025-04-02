import sanityClient, { processExperiencesEntries } from '$lib/utils/experienceSanity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency so the data will refresh when needed
	depends('routes:[lang]:experience:[slug]');

	// Fetch experience data from Sanity
	const rawExperiences: SanityExperiences[] = await sanityClient.fetch(
		`*[_type == "experiences" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawExperiences.length !== 1) {
		return {}; // Let the page handle the error
	}

	const experiences = processExperiencesEntries(rawExperiences);
	const item = experiences[0];

	// Extract the first paragraph from content for description if available
	let description = '';
	const firstTextBlock = item.content.find((block) => block.type === 'text');
	if (firstTextBlock && firstTextBlock.type === 'text') {
		description = firstTextBlock.textToRender;
	}

	// Extract SEO data from the experience item
	return {
		// Signal to parent layouts that this layout has its own SEO data
		__seo_from_child: true,
		seo: {
			title: item.experienceHeadline,
			description: description,
			keywords: item.amenities?.join(', ') || '',
			ogTitle: item.experienceHeadline,
			ogDescription: description,
			ogImage: item.image,
			ogType: 'article',
			ogUrl: '', // Will be filled by layout.svelte with the current URL
			canonical: '', // Will be filled by layout.svelte with the current URL
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: item.experienceHeadline,
				description: description,
				image: item.image,
				author: item.author,
				datePublished: item.createdAt
			}
		}
	};
};
