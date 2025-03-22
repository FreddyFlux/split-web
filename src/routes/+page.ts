import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	throw redirect(307, '/en');
};

///// WORKS FOR HARDCODING IMPORT

// import { createClient } from '@sanity/client';

// export const config = createClient({
// 	projectId: '2evxmpbk',
// 	dataset: 'production',
// 	apiVersion: '2024-01-01',
// 	useCdn: false
// });

// export async function load() {
// 	const data = await config.fetch(`*[_type == "presenter"]`);

// 	if (data) {
// 		return {
// 			presenter: data
// 		};
// 	}
// 	return {
// 		status: 500,
// 		body: new Error('Internal Server Error')
// 	};
// }

// export async function load() {
// 	const language = 'no';
// 	const data = await config.fetch(`*[_type == "hero" && language == $language]`, { language });

// 	if (data) {
// 		return {
// 			hero: data
// 		};
// 	}
// 	return {
// 		status: 500,
// 		body: new Error('Internal Server Error')
// 	};
// }
