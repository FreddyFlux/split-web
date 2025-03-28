<script lang="ts">
	interface ContactCtaProps {
		data: {
			contactCta: ProcessedContactCta;
		};
	}

	let { data }: ContactCtaProps = $props();

	const { contactSectionHeadline, ctaTitle, ctaDescription } = data.contactCta;
</script>

<div class="contact-cta-container container mt-l">
	<h1 class="contact-cta-headline mb-m">{contactSectionHeadline}</h1>
	<div class="contact-cta">
		<h3 class="contact-cta-title mb-s">{ctaTitle}</h3>
		{#each ctaDescription as description}
			<p class="contact-cta-description">{description}</p>
		{/each}
	</div>
</div>

<style>
	.contact-cta-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.contact-cta {
		display: flex;
		flex-direction: column;
		align-items: left;
	}

	.contact-cta h3 {
		width: 80%;
	}

	.contact-cta p {
		width: 70%;
		margin-bottom: 0.7rem;
	}
</style>
