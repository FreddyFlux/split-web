import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
	projectId: '2evxmpbk',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false
};

const sanityClient = createClient(config);
export default sanityClient;
