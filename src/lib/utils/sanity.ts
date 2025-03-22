import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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
			buttonLink: heroSection.buttonLink,
			ctaTitle: heroSection.ctaTitle,
			ctaDescription: heroSection.ctaDescription,
			language: heroSection.language
		};
	});
	return processedHeroSections;
}

export function processPlacesEntries(rawPlaces: SanityPlaces[]) {
	const builder = imageUrlBuilder(sanityClient);
	const processedPlaces = rawPlaces.map((place) => {
		// Helper function to safely process image URLs
		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
			try {
				return builder.image(image).url();
			} catch (error) {
				console.warn('Failed to process image URL:', error);
				return null;
			}
		};

		const projectImageUrl = getImageUrl(place.image);
		const imageGalleryUrls = place.imageGallery
			.map((image) => getImageUrl(image))
			.filter((url): url is string => url !== null);

		return {
			placesTitle: place.placesTitle,
			placesDescription: place.placesDescription,
			name: place.name,
			location: place.location,
			slug: place.slug,
			image: projectImageUrl || null,
			dateStartSeason: place.dateStartSeason,
			dateEndSeason: place.dateEndSeason,
			imageGallery: imageGalleryUrls,
			content: place.content.map(processPlacesContent),
			amenities: place.amenities,
			placeData: place.placeData,
			urlLinks:
				place.urlLinks
					?.filter((link) => link.url)
					.map((link) => ({
						url:
							typeof link.url === 'string'
								? link.url
								: (link.url ? getImageUrl(link.url) : '') || '',
						urlDescription: link.urlDescription || ''
					})) || [],
			language: place.language
		};
	});

	return processedPlaces;
}

function processPlacesContent(content: RawTextContent | RawImageContent) {
	// process text content
	if (content._type === 'block') {
		const processedTextContent: ProcessedTextContent = {
			type: 'text',
			style: content.style,
			textToRender: content.children.map((elem) => elem.text).join('\n')
		};
		return processedTextContent;
	} else {
		// process image content
		const builder = imageUrlBuilder(sanityClient);
		const projectImageUrl = builder.image(content).url();

		const processedImage: ProcessedImageContent = {
			type: 'image',
			url: projectImageUrl
		};
		return processedImage;
	}
}
