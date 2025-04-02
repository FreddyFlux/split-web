import sanityClient, { processPlacesEntries } from '$lib/utils/placeSanity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, depends }) => {
	const lang = params.lang;
	const slug = params.slug;

	// Mark this as a dependency so the data will refresh when needed
	depends('routes:[lang]:places:[slug]');

	// Fetch place data from Sanity
	const rawPlaces: SanityPlaces[] = await sanityClient.fetch(
		`*[_type == "places" && language == $lang && slug == $slug]`,
		{ lang, slug }
	);

	if (rawPlaces.length !== 1) {
		return {}; // Let the page handle the error
	}

	const places = processPlacesEntries(rawPlaces);
	const place = places[0];

	// Extract the first paragraph from content for description if available
	let description = place.placesDescription;
	const firstTextBlock = place.content.find((block) => block.type === 'text');
	if (firstTextBlock && firstTextBlock.type === 'text') {
		// Use first paragraph as fallback if description is empty
		if (!description) {
			description = firstTextBlock.textToRender;
		}
	}

	// Extract SEO data from the place
	return {
		// Signal to parent layouts that this layout has its own SEO data
		__seo_from_child: true,
		seo: {
			title: `${place.name} - ${place.location}`,
			description: description,
			keywords: place.amenities?.join(', ') || '',
			ogTitle: `${place.name} - ${place.location}`,
			ogDescription: description,
			ogImage: place.image,
			ogType: 'article',
			ogUrl: '', // Will be filled by layout.svelte with the current URL
			canonical: '', // Will be filled by layout.svelte with the current URL
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'Place',
				name: place.name,
				description: description,
				image: place.image,
				address: {
					'@type': 'PostalAddress',
					addressLocality: place.location
				}
			}
		}
	};
};
