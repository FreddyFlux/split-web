type SanityMainPageSeo = {
	_id: string;
	_type: 'mainPageSeo';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	title: string;
	description: string;
	keywords: Array<string>;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogLocale: string;
	canonicalUrl: string;
	structuredDataDescription: string;
	alternateLanguages: Array<string>;
	alternateLanguageUrls: Array<string>;
	language: string;
};

interface ProcessedMainPageSeo {
	title: string;
	description: string;
	keywords: Array<string>;
	ogTitle: string;
	ogDescription: string;
	ogUrl: string;
	ogLocale: string;
	canonicalUrl: string;
	structuredDataDescription: string;
	alternateLanguages: Array<string>;
	alternateLanguageUrls: Array<string>;
	language: string;
}
