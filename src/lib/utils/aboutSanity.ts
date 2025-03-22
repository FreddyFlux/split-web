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

export function processAboutSectionEntries(rawAboutSections: SanityAboutSection[]) {
	const builder = imageUrlBuilder(sanityClient);

	// Helper function to safely process image URLs
	const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
		try {
			return builder.image(image).url();
		} catch (error) {
			console.warn('Failed to process image URL:', error);
			return null;
		}
	};

	// const projectImageUrl = getImageUrl(rawAboutSections.linkList[0].image);

	const processedAboutSections: ProcessedAboutSection[] = rawAboutSections.map((aboutSection) => {
		return {
			aboutTitle: aboutSection.aboutTitle,
			aboutDescription: aboutSection.aboutDescription,
			whyUsTitle: aboutSection.whyUsTitle,
			whyUsDescription: aboutSection.whyUsDescription,
			linkList: aboutSection.linkList.map((link) => ({
				name: link.name,
				linkUrl: link.linkUrl,
				image: getImageUrl(link.image) || '',
				_key: link._key
			})),
			language: aboutSection.language
		};
	});
	return processedAboutSections;
}
