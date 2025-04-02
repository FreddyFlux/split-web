<script lang="ts">
	import { ContactForm, PeopleCard, ContactCta, Navbar, Footer } from '$components';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface SanityProps {
		data: {
			contactCta: ProcessedContactCta;
			contactPeople: ProcessedContactPeople[];
			contactForm: ProcessedContactForm;
			nav: ProcessedNavbar;
		};
		lang: string;
	}

	let { data, lang }: SanityProps = $props();

	// Create refs for animation targets
	let ctaRef: HTMLElement;
	let formRef: HTMLElement;
	let peopleRef: HTMLElement;

	onMount(() => {
		// Set initial states for all components
		gsap.set([ctaRef, formRef, peopleRef], { autoAlpha: 0, y: 30 });

		// Create animation timeline
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Animate CTA first
		tl.to(ctaRef, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.2);

		// Then animate the form
		tl.to(formRef, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.5);

		// Then animate the people cards
		tl.to(peopleRef, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.8);
	});
</script>

<Navbar {data} {lang} />

<section class="mt-l">
	<div bind:this={ctaRef} class="animation-element">
		<ContactCta {data} />
	</div>
	<div bind:this={formRef} class="animation-element">
		<ContactForm {data} />
	</div>
	<div bind:this={peopleRef} class="animation-element">
		<PeopleCard {data} />
	</div>
</section>

<Footer {data} />

<style>
	section {
		padding-top: 7rem;
		padding-bottom: 7rem;
	}

	/* Pre-hide elements for smooth animation */
	.animation-element {
		opacity: 0;
		visibility: hidden;
	}
</style>
