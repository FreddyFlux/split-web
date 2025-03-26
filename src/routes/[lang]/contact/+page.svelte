<script lang="ts">
	import { ContactForm, PeopleCard, ContactCta } from '$components';

	interface SanityProps {
		data: {
			contactCta: ProcessedContactCta;
			contactPeople: ProcessedContactPeople[];
			contactForm: ProcessedContactForm;
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="mt-l">
	<ContactCta {data} />
	<ContactForm {data} />
	<PeopleCard {data} />
</section>

<style>
	section {
		padding: 7rem 0;
	}
</style>
