import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: '2evxmpbk',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;

export function processHeroEntries(rawHeroes: SanityHero[]) {
	const processedHeroes: ProcessedHero[] = rawHeroes.map((hero) => {
		return {
			title: hero.title,
			heroText: hero.heroText,
			language: hero.language
		};
	});
	return processedHeroes;
}

export function processHeroSectionEntries(rawHeroSections: SanityHeroSection[]) {
	const processedHeroSections: ProcessedHeroSection[] = rawHeroSections.map((heroSection) => {
		return {
			staticWord: heroSection.staticWord,
			dynamicWord: heroSection.dynamicWord,
			button: heroSection.button,
			buttonLink: heroSection.buttonLink.map((link) => ({
				url: link.url,
				urlDescription: link.urlDescription
			})),
			ctaTitle: heroSection.ctaTitle,
			ctaDescription: heroSection.ctaDescription,
			language: heroSection.language
		};
	});
	return processedHeroSections;
}
