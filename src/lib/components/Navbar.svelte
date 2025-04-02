<script lang="ts">
	import logoImg from '$assets/img/splitsko-logo.png';
	import { LangButtons, Button } from '$components';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import gsap from 'gsap';

	interface NavbarProps {
		data: {
			nav: ProcessedNavbar;
		};
		lang: string;
		slug?: string;
	}

	const { data, lang, slug = undefined }: NavbarProps & { slug?: string } = $props();
	const { language, navbar, mainLink } = data.nav;

	// State variables for GSAP scroll animation
	let lastScroll = $state(0);
	let isNavVisible = $state(true);
	let nav = $state<HTMLElement | null>(null);
	let mobileMenu = $state<HTMLElement | null>(null);
	let isMobileMenuOpen = $state(false);

	/**
	 * Handles language switching functionality
	 * Updates URL to reflect the new language selection
	 */
	function setLanguage(language: string) {
		const currentPath = window.location.pathname;
		const pathParts = currentPath.split('/').filter(Boolean);

		pathParts[0] = language;

		if (slug) {
			if (pathParts.length < 3) {
				pathParts.push('experience', slug);
			} else {
				pathParts[0] = language;
			}
		}

		window.location.href = `/${pathParts.join('/')}`;
	}

	/**
	 * Toggle mobile menu visibility
	 */
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	/**
	 * Close mobile menu
	 */
	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	/**
	 * Navigate to a link and close the mobile menu
	 */
	function navigateAndClose(link: string) {
		closeMobileMenu();
		window.location.href = link;
	}

	onMount(() => {
		// Initialize GSAP animation state
		gsap.set(nav, { y: 0 });

		/**
		 * Scroll event handler
		 * Controls navbar visibility based on scroll direction:
		 * - Scrolling down: hide navbar and close dropdown menu
		 * - Scrolling up: show navbar
		 * - At top of page: reset position
		 */
		const handleScroll = () => {
			const currentScroll = window.pageYOffset;

			// At top of page: Always show navbar
			if (currentScroll <= 0) {
				gsap.to(nav, {
					y: 0,
					duration: 0.3,
					ease: 'power2.out'
				});
				if (mobileMenu && isMobileMenuOpen) {
					gsap.to(mobileMenu, {
						y: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
				isNavVisible = true;
				return;
			}

			// Scrolling down: Hide navbar with smooth animation and close mobile menu
			if (currentScroll > lastScroll && isNavVisible) {
				gsap.to(nav, {
					y: '-100%',
					duration: 0.3,
					ease: 'power2.out'
				});

				// Close mobile menu if it's open
				if (isMobileMenuOpen) {
					// First animate the menu up with the navbar
					if (mobileMenu) {
						gsap.to(mobileMenu, {
							y: '-100%',
							duration: 0.3,
							ease: 'power2.out',
							onComplete: () => {
								// Then actually close it once animation completes
								closeMobileMenu();
							}
						});
					} else {
						closeMobileMenu();
					}
				}

				isNavVisible = false;
			}
			// Scrolling up: Show navbar with smooth animation
			else if (currentScroll < lastScroll && !isNavVisible) {
				gsap.to(nav, {
					y: 0,
					duration: 0.3,
					ease: 'power2.out',
					onComplete: () => {
						if (nav) {
							nav.classList.add('bs-m');
						}
					}
				});
				if (mobileMenu && isMobileMenuOpen) {
					gsap.to(mobileMenu, {
						y: 0,
						duration: 0.3,
						ease: 'power2.out'
					});
				}
				isNavVisible = true;
			}

			// Store current scroll position for next comparison
			lastScroll = currentScroll;
		};

		// Add and remove scroll event listener
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav class="navigation" bind:this={nav}>
	<div class="logo">
		<a href="/">
			<img src={logoImg} alt="logo" />
		</a>
	</div>
	<LangButtons {setLanguage} />

	<!-- Desktop Menu -->
	<div class="menu desktop-menu">
		{#each navbar as item}
			<a href={`/${language}/${item.link}`} class="nav-bar-item">{item.name}</a>
		{/each}
		<Button
			onclick={() => {
				window.location.href = `/${language}/contact`;
			}}
		>
			{mainLink}
		</Button>
	</div>

	<!-- Mobile Menu Button -->
	<div class="hamburger-container">
		<button class="hamburger-button" on:click={toggleMobileMenu}>
			<span class="hamburger-icon" class:open={isMobileMenuOpen}>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</button>
	</div>
</nav>

<!-- Mobile Menu Dropdown -->
{#if isMobileMenuOpen}
	<div
		class="mobile-menu-dropdown"
		bind:this={mobileMenu}
		transition:slide={{ duration: 300, axis: 'x' }}
	>
		<div class="mobile-menu-content">
			{#each navbar as item}
				<a
					href={`/${language}/${item.link}`}
					class="mobile-nav-item"
					on:click|preventDefault={() => navigateAndClose(`/${language}/${item.link}`)}
				>
					{item.name}
				</a>
			{/each}
			<div class="mobile-contact-btn">
				<Button
					onclick={() => {
						navigateAndClose(`/${language}/contact`);
					}}
				>
					{mainLink}
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Main navigation container */
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
		background-color: var(--color-kamen-light-2);
		z-index: 1000;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.navigation {
			padding: 1rem 2rem;
		}
	}

	/* Menu items container */
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

	/* Logo styling */
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

	/* Hamburger menu styles */
	.hamburger-container {
		display: none;
	}

	.hamburger-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
	}

	.hamburger-icon {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 24px;
	}

	.hamburger-icon span {
		display: block;
		height: 3px;
		width: 100%;
		background-color: #000;
		border-radius: 3px;
		transition: all 0.3s ease;
	}

	.hamburger-icon.open span:nth-child(1) {
		transform: translateY(10.5px) rotate(45deg);
	}

	.hamburger-icon.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger-icon.open span:nth-child(3) {
		transform: translateY(-10.5px) rotate(-45deg);
	}

	/* Mobile dropdown menu */
	.mobile-menu-dropdown {
		position: fixed;
		top: calc(12vh - 1px); /* Overlap 1px to avoid gap */
		right: 0;
		width: 20%;
		height: auto;
		background-color: var(--color-kamen-light-2);
		z-index: 1001;
		box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.1);
		overflow-y: auto;
		border-bottom-left-radius: 8px;
	}

	.mobile-menu-content {
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1.5rem 2rem;
	}

	.mobile-nav-item {
		text-decoration: none;
		color: #000;
		font-weight: 600;
		font-size: 1.6rem;
		padding: 1.2rem 0.8rem;
		margin-bottom: 0.5rem;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
		background-color: rgba(0, 0, 0, 0.05);
	}

	.mobile-nav-item:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.mobile-contact-btn {
		margin-top: 1rem;
	}

	/* Media queries for mobile menu responsiveness */
	@media screen and (max-width: 56.25em) {
		.mobile-menu-dropdown {
			width: 30%;
		}
	}

	@media screen and (max-width: 37.5em) {
		.mobile-menu-dropdown {
			width: 50%;
		}
	}

	/* Responsive behavior */
	@media screen and (max-width: 75em) {
		/* 1200px */
		.desktop-menu {
			display: none;
		}

		.hamburger-container {
			display: block;
		}
	}
</style>
