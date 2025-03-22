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

export function processExperienceSectionEntries(rawExperienceSections: SanityExperienceSection[]) {
	const processedExperienceSections: ProcessedExperienceSection[] = rawExperienceSections.map(
		(experienceSection) => {
			return {
				experienceHeadline: experienceSection.experienceHeadline,
				experienceContent: experienceSection.experienceContent,
				language: experienceSection.language
			};
		}
	);
	return processedExperienceSections;
}

export function processExperiencesEntries(rawExperiences: SanityExperiences[]) {
	const builder = imageUrlBuilder(sanityClient);
	const processedExperiences = rawExperiences.map((experience) => {
		// Helper function to safely process image URLs
		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
			try {
				return builder.image(image).url();
			} catch (error) {
				console.warn('Failed to process image URL:', error);
				return null;
			}
		};

		const projectImageUrl = getImageUrl(experience.image);
		const imageGalleryUrls = experience.imageGallery
			?.map((image) => getImageUrl(image))
			.filter((url): url is string => url !== null);

		return {
			experienceHeadline: experience.experienceHeadline,
			content: experience.content.map(processExperiencesContent),
			author: experience.author,
			slug: experience.slug,
			image: projectImageUrl || null,
			createdAt: experience.createdAt,
			imageGallery: imageGalleryUrls,
			amenities: experience.amenities,
			placeData: experience.placeData,
			urlLinks:
				experience.urlLinks
					?.filter((link) => link.url)
					.map((link) => ({
						url:
							typeof link.url === 'string'
								? link.url
								: (link.url ? getImageUrl(link.url) : '') || '',
						urlDescription: link.urlDescription || ''
					})) || [],
			language: experience.language
		};
	});

	return processedExperiences;
}

function processExperiencesContent(content: RawTextContent | RawImageContent) {
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
