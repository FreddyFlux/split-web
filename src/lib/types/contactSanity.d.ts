type SanityContactCta = {
	_id: string;
	_type: 'contactCta';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	contactSectionHeadline: string;
	ctaTitle: string;
	ctaDescription: Array<string>;
	ctaButtonText: string;
	ctaButtonLink: string;
	peopleTitle: string;
	language: string;
};

interface ProcessedContactCta {
	contactSectionHeadline: string;
	ctaTitle: string;
	ctaDescription: Array<string>;
	ctaButtonText: string;
	ctaButtonLink: string;
	peopleTitle: string;
	language: string;
}

type SanityContactPeople = {
	_id: string;
	_type: 'contactPeople';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	peopleName: string;
	peopleTitle: string;
	peopleDescription: string;
	peopleEmail: string;
	peoplePhone: string;
	image: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	language: string;
};

interface ProcessedContactPeople {
	peopleName: string;
	peopleTitle: string;
	peopleDescription: string;
	peopleEmail: string;
	peoplePhone: string;
	image: string;
	language: string;
}

type SanityContactForm = {
	_id: string;
	_type: 'contactForm';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	formHeadline: string;
	formTitle: string;
	formDescription: Array<string>;
	nameInputPlaceholder: string;
	emailInputPlaceholder: string;
	messageInputPlaceholder: string;
	submitButtonText: string;
	successMessage: string;
	loadingMessage: string;
	errorMessage: string;
	language: string;
};

interface ProcessedContactForm {
	formHeadline: string;
	formTitle: string;
	formDescription: Array<string>;
	nameInputPlaceholder: string;
	emailInputPlaceholder: string;
	messageInputPlaceholder: string;
	submitButtonText: string;
	successMessage: string;
	loadingMessage: string;
	errorMessage: string;
	language: string;
}
