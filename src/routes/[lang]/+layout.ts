import sanityClient from '$lib/utils/sanityHandler';
import { processMainPageSeoEntries } from '$lib/utils/mainPageSeoSanity';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const lang = params.lang;

	// Fetch SEO data from Sanity
	const rawSeoData = await sanityClient.fetch(`*[_type == "mainPageSeo" && language == $lang]`, {
		lang
	});

	if (rawSeoData.length !== 1) {
		// Use default SEO if no specific SEO data found
		return {};
	}

	const seoData = processMainPageSeoEntries(rawSeoData)[0];

	return {
		seo: {
			title: seoData.title,
			description: seoData.description,
			keywords: seoData.keywords.join(', '),
			ogTitle: seoData.ogTitle,
			ogDescription: seoData.ogDescription,
			ogUrl: seoData.ogUrl,
			ogLocale: seoData.ogLocale,
			canonical: seoData.canonicalUrl,
			structuredData: {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				description: seoData.structuredDataDescription
			},
			alternateLanguages:
				seoData.alternateLanguages && seoData.alternateLanguageUrls
					? Object.fromEntries(
							seoData.alternateLanguages.map((lang, index) => [
								lang,
								seoData.alternateLanguageUrls[index]
							])
						)
					: {}
		}
	};
};
