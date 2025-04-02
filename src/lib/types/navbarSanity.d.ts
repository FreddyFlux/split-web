type SanityNavbar = {
	_id: string;
	_type: 'navbar';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	navbar: Array<{
		name: string;
		link: string;
		_key: string;
	}>;
	mainLink: string;
	copyrightText: string;
	language: string;
};

interface ProcessedNavbar {
	navbar: Array<{
		name: string;
		link: string;
		_key: string;
	}>;
	mainLink: string;
	copyrightText: string;
	language: string;
}
