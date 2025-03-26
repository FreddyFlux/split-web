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

export function processContactCtaEntries(rawContactCta: SanityContactCta[]) {
	const processedContactCta: ProcessedContactCta[] = rawContactCta.map((contactCta) => {
		return {
			contactSectionHeadline: contactCta.contactSectionHeadline,
			ctaTitle: contactCta.ctaTitle,
			ctaDescription: contactCta.ctaDescription,
			ctaButtonText: contactCta.ctaButtonText,
			ctaButtonLink: contactCta.ctaButtonLink,
			language: contactCta.language
		};
	});
	return processedContactCta;
}

export function processContactPeopleEntries(rawContactPeople: SanityContactPeople[]) {
	const builder = imageUrlBuilder(sanityClient);
	const processedContactPeople = rawContactPeople.map((people) => {
		// Helper function to safely process image URLs
		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
			try {
				if (!image || !image.asset) {
					console.warn('Image asset is missing or undefined:', image);
					return null;
				}
				return builder.image(image).url();
			} catch (error) {
				console.warn('Failed to process image URL:', error);
				return null;
			}
		};

		// Check for image fields defensively
		let projectImageUrl = null;
		if (people.image && people.image.asset) {
			projectImageUrl = getImageUrl(people.image);
		} else if ('peopleImage' in people) {
			// Safe access for potentially unknown property
			const peopleImageRaw = people as Record<string, unknown>;
			const peopleImage = peopleImageRaw['peopleImage'];

			// Type guard to check if it has the right structure
			if (
				peopleImage &&
				typeof peopleImage === 'object' &&
				peopleImage !== null &&
				'asset' in peopleImage
			) {
				// Now we know it has the right shape
				const typedImage = peopleImage as { asset?: { _ref: string; _type: string } };
				projectImageUrl = getImageUrl(typedImage);
			}
		}

		return {
			peopleName: people.peopleName,
			peopleTitle: people.peopleTitle,
			peopleDescription: people.peopleDescription,
			peopleEmail: people.peopleEmail,
			peoplePhone: people.peoplePhone,
			image: projectImageUrl,
			language: people.language
		};
	});

	return processedContactPeople;
}

// export function processContactPeopleEntries(
// 	rawContactPeople: SanityContactPeople[]
// ): ProcessedContactPeople[] {
// 	const builder = imageUrlBuilder(sanityClient);

// 	const processedContactPeople: ProcessedContactPeople[] = rawContactPeople.map((contactPeople) => {
// 		// Helper function to safely process image URLs
// 		const getImageUrl = (image: { asset?: { _ref: string; _type: string } }) => {
// 			try {
// 				return builder.image(image).url();
// 			} catch (error) {
// 				console.warn('Failed to process image URL:', error);
// 				return null;
// 			}
// 		};

// 		const projectImageUrl = getImageUrl(contactPeople.peopleImage);

// 		return {
// 			peopleName: contactPeople.peopleName || '',
// 			peopleTitle: contactPeople.peopleTitle || '',
// 			peopleDescription: contactPeople.peopleDescription || '',
// 			peopleEmail: contactPeople.peopleEmail || '',
// 			peoplePhone: contactPeople.peoplePhone || '',
// 			peopleImage: projectImageUrl || null,
// 			language: contactPeople.language || ''
// 		};
// 	});
// 	return processedContactPeople;
// }

export function processContactFormEntries(rawContactForm: SanityContactForm[]) {
	const processedContactForm: ProcessedContactForm[] = rawContactForm.map((contactForm) => {
		return {
			formHeadline: contactForm.formHeadline,
			formTitle: contactForm.formTitle,
			formDescription: contactForm.formDescription,
			nameInputPlaceholder: contactForm.nameInputPlaceholder,
			emailInputPlaceholder: contactForm.emailInputPlaceholder,
			messageInputPlaceholder: contactForm.messageInputPlaceholder,
			submitButtonText: contactForm.submitButtonText,
			successMessage: contactForm.successMessage,
			loadingMessage: contactForm.loadingMessage,
			errorMessage: contactForm.errorMessage,
			language: contactForm.language
		};
	});
	return processedContactForm;
}
