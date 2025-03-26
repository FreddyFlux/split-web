<script lang="ts">
	import type { Snippet } from 'svelte';
	interface ButtonProps {
		children: Snippet;
		onclick: ((e: MouseEvent) => void) | (() => void);
		className?: String;
	}

	let { children, className, ...props }: ButtonProps = $props();
</script>

<button class={`btn ${className}`} {...props}>
	{@render children()}
</button>

<style>
	.btn {
		font-family: 'Inter Tight', sans-serif;
		font-weight: 500;
		background-color: black;
		color: white;
		font-size: 2rem;
		padding: 1.4rem 4rem;
		border-radius: 5px;
	}

	.nav-bar {
		padding: 1rem 2.4rem;
		font-size: 2rem;
	}

	@media screen and (max-width: 37.5em) {
		/* 600px */
		.nav-bar {
			padding: 0.5rem 1rem;
			font-size: 1.6rem;
		}
	}
</style>
