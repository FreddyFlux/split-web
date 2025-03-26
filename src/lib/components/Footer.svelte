<script lang="ts">
	import { page } from '$app/stores';
	import logoImg from '$assets/img/splitsko-logo.png';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let currentLang: string;

	onMount(() => {
		const pathParts = window.location.pathname.split('/').filter(Boolean);
		currentLang = pathParts[0];
	});
</script>

<footer class="footer">
	<div class="footer-content">
		<!-- Social Media Links -->
		<div class="social-links">
			<a
				href="https://github.com/freddyFlux"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Github"
			>
				<Icon icon="mdi:github" width="32" height="32"></Icon>
			</a>
			<a
				href="https://linkedin.com"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<Icon icon="mdi:linkedin" width="32" height="32"></Icon>
			</a>
		</div>

		<!-- Logo -->
		<div class="logo">
			<a href="/">
				<img src={logoImg} alt="Splitsko Logo" />
			</a>
		</div>

		<!-- Site Links -->
		<nav class="site-links">
			<a href={`/${currentLang}/#places`} class:active={$page.url.pathname === '#places'}>Places</a>
			<a href={`/${currentLang}/#experiences`} class:active={$page.url.pathname === '#experiences'}
				>Experiences</a
			>
			<a href={`/${currentLang}/#hospitality`} class:active={$page.url.pathname === '#hospitality'}
				>Hospitality</a
			>
		</nav>
	</div>
</footer>

<style>
	.footer {
		padding: 9vh 0;
		margin-top: auto;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.social-links {
		display: flex;
		gap: 1.5rem;
	}

	.social-links a {
		font-size: 3rem;
		transition: color 0.3s ease;
	}

	.social-links a:hover {
		color: #ffd700;
	}

	.logo img {
		height: 50px;
		width: auto;
	}

	.site-links {
		display: flex;
		gap: 2rem;
	}

	.site-links a {
		font-size: 2rem;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.site-links a:hover {
		color: #ffd700;
	}

	.site-links a.active {
		color: #ffd700;
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 2rem;
			text-align: center;
		}

		.social-links {
			justify-content: center;
		}

		.site-links {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
