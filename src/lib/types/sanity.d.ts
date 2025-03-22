type SanityHero = {
	_id: string;
	_type: 'hero';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	title: string;
	heroText: string;
	language: string;
};

interface ProcessedHero {
	title: string;
	heroText: string;
	language: string;
}
type SanityHeroSection = {
	_id: string;
	_type: 'heroSection';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	staticWord: string;
	dynamicWord: Array<string>;
	button: string;
	buttonLink: Array<string>;
	ctaTitle: string;
	ctaDescription: string;
	language: string;
};

interface ProcessedHeroSection {
	staticWord: string;
	dynamicWord: Array<string>;
	button: string;
	buttonLink: Array<string>;
	ctaTitle: string;
	ctaDescription: string;
	language: string;
}

type SanityPlaces = {
	_id: string;
	_type: 'places';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	placesTitle: string;
	placesDescription: string;
	name: string;
	location: string;
	slug: string;
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
	dateStartSeason: string;
	dateEndSeason: string;
	imageGallery: Array<{
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
		_key: string;
	}>;
	content: Array<RawTextContent | RawImageContent>;
	amenities: Array<string>;
	placeData: Array<{
		iconClass: string;
		iconDescription?: string;
		placeData: string;
		_key: string;
	}>;
	urlLinks?: Array<{
		url?: string;
		urlDescription?: string;
		_key: string;
	}>;
	language: string;
};

interface RawTextContent {
	children: Array<{
		marks?: Array<string>;
		text: string;
		_type: 'span';
		_key: string;
	}>;
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
	listItem?: 'bullet' | 'number';
	markDefs?: Array<{
		href?: string;
		_type: 'link';
		_key: string;
	}>;
	level?: number;
	_type: 'block';
	_key: string;
}

interface RawImageContent {
	asset: {
		_ref: string;
		_type: 'reference';
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
	};
	hotspot?: SanityImageHotspot;
	crop?: SanityImageCrop;
	_type: 'image';
	_key: string;
}

interface ProcessedPlaces {
	placesTitle: string;
	placesDescription: string;
	name: string;
	location: string;
	slug: string;
	image: string;
	dateStartSeason: string;
	dateEndSeason: string;
	imageGallery: Array<string>;
	content: Array<ProcessedTextContent | ProcessedImageContent>;
	amenities: Array<string>;
	placeData: Array<{
		iconClass: string;
		iconDescription?: string;
		placeData: string;
	}>;
	urlLinks: Array<{
		url: string;
		urlDescription: string;
	}>;
	language: string;
}

interface ProcessedTextContent {
	type: 'text';
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
	textToRender: string;
}

interface ProcessedImageContent {
	type: 'image';
	url: string;
}
