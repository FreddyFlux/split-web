<script lang="ts">
	import { page } from '$app/stores';

	let { children, data } = $props();

	// Default SEO values (fallback if layout.ts doesn't provide them)
	const seo = {
		title: 'Split Experiences',
		description: 'Explore unique experiences in Split and surrounding areas',
		keywords: 'split, croatia, experiences, activities, travel',
		ogTitle: 'Split Experiences',
		ogDescription: 'Explore unique experiences in Split and surrounding areas',
		ogImage: '',
		ogUrl: '',
		ogType: 'article',
		ogLocale: 'en_US',
		twitterCard: 'summary_large_image',
		canonical: '',
		robotsContent: 'index, follow',
		themeColor: '#ffffff',
		viewport: 'width=device-width, initial-scale=1',
		structuredData: {},
		alternateLanguages: {}
	};

	// Merge page-specific SEO data if provided
	const pageSeo = $derived({
		...seo,
		...(data?.seo || {}),
		ogUrl: data?.seo?.ogUrl || $page.url.href,
		canonical: data?.seo?.canonical || $page.url.href
	});
</script>

<svelte:head>
	<!-- Dynamic SEO -->
	<title>{pageSeo.title}</title>
	<meta name="description" content={pageSeo.description} />
	{#if pageSeo.keywords}
		<meta name="keywords" content={pageSeo.keywords} />
	{/if}

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

	<!-- Structured data / JSON-LD for rich snippets -->
	{#if pageSeo.structuredData && Object.keys(pageSeo.structuredData).length > 0}
		<script type="application/ld+json">
			{JSON.stringify(pageSeo.structuredData)}
		</script>
	{/if}
</svelte:head>

<!-- Render page content -->
{@render children()}
