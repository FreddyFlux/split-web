<script lang="ts">
	export let href: string | undefined = undefined;
	export let variant: 'primary' | 'outline' | 'secondary' = 'primary';
	export let className: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let fontSize: string = '3rem';

	$: buttonClass = `button ${variant} ${className}`;
	$: buttonStyle = `font-size: ${fontSize}; padding: calc(${fontSize} * 0.5) calc(${fontSize} * 1.25); line-height: calc(${fontSize} * 1.25);`;
</script>

{#if href}
	<a {href} class={buttonClass} class:disabled style={buttonStyle} on:click {...$$restProps}>
		<slot />
	</a>
{:else}
	<button {type} class={buttonClass} {disabled} style={buttonStyle} on:click {...$$restProps}>
		<slot />
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rem;
		font-weight: 500;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
		border: none;
		outline: none;
	}

	.button:focus {
		outline: none;
		box-shadow:
			0 0 0 2px #fff,
			0 0 0 4px #3b82f6;
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Primary variant */
	.primary {
		background-color: #2563eb;
		color: white;
	}

	.primary:hover:not(:disabled) {
		background-color: #1d4ed8;
	}

	/* Outline variant */
	.outline {
		background-color: transparent;
		border: 2px solid var(--color-turquoise);
		color: var(--color-turquoise);
	}

	.outline:hover:not(:disabled) {
		background-color: var(--color-brown-grey-light);
	}

	/* Secondary variant */
	.secondary {
		background-color: #e5e7eb;
		color: #111827;
	}

	.secondary:hover:not(:disabled) {
		background-color: #d1d5db;
	}

	.disabled {
		pointer-events: none;
	}
</style>
