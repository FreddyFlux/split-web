type SanityAboutSection = {
	_id: string;
	_type: 'aboutSection';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	aboutTitle: string;
	aboutDescription: Array<string>;
	whyUsTitle: string;
	whyUsDescription: Array<string>;
	linkList: Array<{
		name: string;
		linkUrl: string;
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
		_key: string;
	}>;
	language: string;
};

interface ProcessedAboutSection {
	aboutTitle: string;
	aboutDescription: Array<string>;
	whyUsTitle: string;
	whyUsDescription: Array<string>;
	linkList: Array<{
		name: string;
		linkUrl: string;
		image: string;
		_key: string;
	}>;
	language: string;
}
