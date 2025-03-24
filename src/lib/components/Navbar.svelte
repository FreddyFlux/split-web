<script lang="ts">
	import logoImg from '$assets/img/splitsko-logo.png';
	import { LangButtons } from '$components';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';

	export let slug: string | undefined = undefined;

	let lastScroll = 0;
	let scrollDirection = '';
	let nav: HTMLElement;

	function setLanguage(language: string) {
		const currentPath = window.location.pathname;
		const pathParts = currentPath.split('/').filter(Boolean);

		// Update the language part (first segment)
		pathParts[0] = language;

		// If we're on an experience page (has slug), ensure we maintain the structure
		if (slug) {
			// Ensure we have the correct structure: /[lang]/experience/[slug]
			if (pathParts.length < 3) {
				pathParts.push('experience', slug);
			} else {
				pathParts[0] = language;
			}
		}

		window.location.href = `/${pathParts.join('/')}`;
	}

	onMount(() => {
		const handleScroll = () => {
			const currentScroll = window.pageYOffset;

			if (currentScroll <= 0) {
				scrollDirection = '';
				nav.classList.remove('bs-m');
				return;
			}

			if (currentScroll > lastScroll) {
				scrollDirection = 'scroll-down';
				nav.classList.remove('bs-m');
			} else if (currentScroll < lastScroll) {
				scrollDirection = 'scroll-up';
				nav.classList.add('bs-m');
			}

			lastScroll = currentScroll;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	class="navigation"
	bind:this={nav}
	class:scroll-down={scrollDirection === 'scroll-down'}
	class:scroll-up={scrollDirection === 'scroll-up'}
>
	<div class="logo">
		<a href="/">
			<img src={logoImg} alt="logo" />
		</a>
	</div>
	<LangButtons {setLanguage} />
	<div class="menu">
		<a href="#places">places</a>
		<a href="#experiences">experiences</a>
		<a href="#hospitality">hospitality</a>
		<Button href="#places" variant="outline">contact</Button>
	</div>
</nav>

<style>
	.navigation {
		max-height: 12vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 5rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: transparent;
		z-index: 1000;
		transition: transform 0.3s ease-in-out;
		background-color: var(--color-kamen-light-2);
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.navigation {
			padding: 1rem 2rem;
		}
	}

	.navigation.scroll-down {
		transform: translateY(-100%);
	}

	.navigation.scroll-up {
		transform: translateY(0);
	}

	.menu {
		display: flex;
		align-items: center;
		gap: 4rem;
		font-size: 3rem;
	}

	@media screen and (max-width: 56.25em) {
		.menu {
			gap: 2rem;
			font-size: 2.4rem;
		}
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.menu {
			gap: 2rem;
			font-size: 1.8rem;
		}
	}
	.menu a {
		text-decoration: none;
		color: #000;
		font-weight: 600;
	}

	.logo {
		max-width: 30rem;
	}

	@media screen and (max-width: 56.25em) {
		.logo {
			max-width: 20rem;
		}
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.logo {
			max-width: 13rem;
		}
	}

	.logo img {
		width: 100%;
		height: auto;
		display: block;
	}

	.logo a {
		display: block;
		text-decoration: none;
	}
</style>
