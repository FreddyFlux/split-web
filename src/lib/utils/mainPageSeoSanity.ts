export function processMainPageSeoEntries(rawSeoSection: SanityMainPageSeo[]) {
	const processedSeoSection: ProcessedMainPageSeo[] = rawSeoSection.map((seoSection) => {
		return {
			title: seoSection.title,
			description: seoSection.description,
			keywords: seoSection.keywords,
			ogTitle: seoSection.ogTitle,
			ogDescription: seoSection.ogDescription,
			ogUrl: seoSection.ogUrl,
			ogLocale: seoSection.ogLocale,
			canonicalUrl: seoSection.canonicalUrl,
			structuredDataDescription: seoSection.structuredDataDescription,
			alternateLanguages: seoSection.alternateLanguages,
			alternateLanguageUrls: seoSection.alternateLanguageUrls,
			language: seoSection.language
		};
	});
	return processedSeoSection;
}
