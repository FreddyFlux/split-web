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

export function processHospitalitySectionEntries(
	rawHospitalitySections: SanityHospitalitySection[]
) {
	const processedHospitalitySections: ProcessedHospitalitySection[] = rawHospitalitySections.map(
		(hospitalitySection) => {
			return {
				hospitalityHeadline: hospitalitySection.hospitalityHeadline,
				hospitalityContent: hospitalitySection.hospitalityContent,
				language: hospitalitySection.language
			};
		}
	);
	return processedHospitalitySections;
}

export function processHospitalityEntries(rawHospitality: SanityHospitality[]) {
	const builder = imageUrlBuilder(sanityClient);
	const processedHospitality = rawHospitality.map((hospitality) => {
		// Helper function to safely process image URLs
		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
			try {
				return builder.image(image).url();
			} catch (error) {
				console.warn('Failed to process image URL:', error);
				return null;
			}
		};

		const projectImageUrl = getImageUrl(hospitality.image);
		const imageGalleryUrls = hospitality.imageGallery
			?.map((image) => getImageUrl(image))
			.filter((url): url is string => url !== null);

		return {
			hospitalityHeadline: hospitality.hospitalityHeadline,
			content: hospitality.content.map(processHospitalityContent),
			author: hospitality.author,
			slug: hospitality.slug,
			image: projectImageUrl || null,
			createdAt: hospitality.createdAt,
			imageGallery: imageGalleryUrls,
			amenities: hospitality.amenities,
			placeData: hospitality.placeData,
			urlLinks:
				hospitality.urlLinks
					?.filter((link) => link.url)
					.map((link) => ({
						url:
							typeof link.url === 'string'
								? link.url
								: (link.url ? getImageUrl(link.url) : '') || '',
						urlDescription: link.urlDescription || ''
					})) || [],
			language: hospitality.language
		};
	});

	return processedHospitality;
}

function processHospitalityContent(content: RawTextContent | RawImageContent) {
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
