type SanityHospitalitySection = {
	_id: string;
	_type: 'hospitalitySection';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	hospitalityHeadline: string;
	hospitalityContent: string;
	language: string;
};

interface ProcessedHospitalitySection {
	hospitalityHeadline: string;
	hospitalityContent: string;
	language: string;
}

type SanityHospitality = {
	_id: string;
	_type: 'hospitality';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	hospitalityHeadline: string;
	content: Array<RawTextContent | RawImageContent>;
	author: string;
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
	createdAt: string;
	imageGallery?: Array<{
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
	amenities: Array<string>;
	placeData: Array<{
		iconClass: string;
		iconDescription: string;
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

interface ProcessedHospitality {
	hospitalityHeadline: string;
	content: Array<ProcessedTextContent | ProcessedImageContent>;
	author: string;
	slug: string;
	image: string;
	createdAt: string;
	imageGallery: Array<string>;
	amenities: Array<string>;
	placeData: Array<{
		iconClass: string;
		iconDescription: string;
		placeData: string;
	}>;
	urlLinks?: Array<{
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
