type SanityHeroSection = {
	_id: string;
	_type: 'heroSection';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	staticWord: string;
	dynamicWord: Array<string>;
	button: string;
	buttonLink: Array<{
		url: string;
		urlDescription: string;
	}>;
	ctaTitle: string;
	ctaDescription: string;
	language: string;
};

interface ProcessedHeroSection {
	staticWord: string;
	dynamicWord: Array<string>;
	button: string;
	buttonLink: Array<{
		url: string;
		urlDescription: string;
	}>;
	ctaTitle: string;
	ctaDescription: string;
	language: string;
}
