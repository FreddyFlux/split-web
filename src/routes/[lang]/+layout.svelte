<script lang="ts">
	import { page } from '$app/stores';

	let { children, data } = $props();

	// Check if a child route is providing its own SEO data
	// The presence of __seo_from_child indicates that a child layout has SEO data
	const childHasSeo = $derived($page.data.__seo_from_child === true);

	// Default SEO values
	const seo = {
		title: 'Default Site Title',
		description: 'Default site description for SEO purposes',
		keywords: 'default, keywords, site',
		ogTitle: 'Default Open Graph Title',
		ogDescription: 'Default Open Graph Description',
		ogImage: '/path/to/default-og-image.jpg',
		ogUrl: '',
		ogType: 'website',
		ogLocale: 'en_US',
		twitterCard: 'summary_large_image',
		canonical: '',
		robotsContent: 'index, follow',
		themeColor: '#ffffff',
		viewport: 'width=device-width, initial-scale=1',
		structuredData: {},
		alternateLanguages: {} // e.g. { en: '/en/path', fr: '/fr/path' }
	};

	// Type for SEO data
	type SeoData = typeof seo & {
		[key: string]: string | object | Record<string, string>;
	};

	// Merge page-specific SEO data if provided
	const pageSeo = $derived({
		...seo,
		...(data?.seo || {}), // Get SEO data from layout.ts (Sanity)
		ogUrl: data?.seo?.ogUrl || $page.url.href,
		canonical: data?.seo?.canonical || $page.url.href
	});
</script>

<svelte:head>
	<!-- Only include SEO meta tags if no child route has SEO data -->
	{#if !childHasSeo}
		<!-- Dynamic SEO -->
		<title>{pageSeo.title}</title>
		<meta name="description" content={pageSeo.description} />
		<meta name="keywords" content={pageSeo.keywords} />

		<!-- Responsive design -->
		<meta name="viewport" content={pageSeo.viewport} />

		<!-- Robots control -->
		<meta name="robots" content={pageSeo.robotsContent} />

		<!-- Theme color for browser UI -->
		<meta name="theme-color" content={pageSeo.themeColor} />

		<!-- Open Graph / Facebook -->
		<meta property="og:type" content={pageSeo.ogType} />
		<meta property="og:locale" content={pageSeo.ogLocale} />
		<meta property="og:url" content={pageSeo.ogUrl} />
		<meta property="og:title" content={pageSeo.ogTitle || pageSeo.title} />
		<meta property="og:description" content={pageSeo.ogDescription || pageSeo.description} />
		{#if pageSeo.ogImage}
			<meta property="og:image" content={pageSeo.ogImage} />
		{/if}

		<!-- Twitter -->
		<meta name="twitter:card" content={pageSeo.twitterCard} />
		<meta name="twitter:url" content={pageSeo.ogUrl} />
		<meta name="twitter:title" content={pageSeo.ogTitle || pageSeo.title} />
		<meta name="twitter:description" content={pageSeo.ogDescription || pageSeo.description} />
		{#if pageSeo.ogImage}
			<meta name="twitter:image" content={pageSeo.ogImage} />
		{/if}

		<!-- Canonical URL -->
		<link rel="canonical" href={pageSeo.canonical} />

		<!-- Alternate language URLs -->
		{#if pageSeo.alternateLanguages && typeof pageSeo.alternateLanguages === 'object'}
			{#each Object.entries(pageSeo.alternateLanguages) as [lang, url]}
				<link rel="alternate" hreflang={lang} href={url} />
			{/each}
		{/if}

		<!-- Structured data / JSON-LD for rich snippets -->
		{#if pageSeo.structuredData && Object.keys(pageSeo.structuredData).length > 0}
			<script type="application/ld+json">
				{JSON.stringify(pageSeo.structuredData)}
			</script>
		{/if}
	{/if}
</svelte:head>

<!-- Render page content -->
{@render children()}
