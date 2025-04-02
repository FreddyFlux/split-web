export function processNavbarEntries(rawNavbar: SanityNavbar[]) {
	const processedNavbar: ProcessedNavbar[] = rawNavbar.map((navbar) => {
		return {
			navbar: navbar.navbar,
			mainLink: navbar.mainLink,
			copyrightText: navbar.copyrightText,
			language: navbar.language
		};
	});
	return processedNavbar;
}
