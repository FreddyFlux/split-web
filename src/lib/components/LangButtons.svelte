<script lang="ts">
	import Icon from '@iconify/svelte';

	export let setLanguage: (language: string) => void;
</script>

<div class="button-container">
	<button onclick={() => setLanguage('en')}
		><Icon icon="circle-flags:uk" class="flag-icon"></Icon></button
	>
	<button onclick={() => setLanguage('no')}
		><Icon icon="circle-flags:lang-no" class="flag-icon"></Icon></button
	>
</div>

<style>
	.button-container {
		display: flex;
		gap: 0.5rem;
	}

	.button-container button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Flag icons will be 32px by default (reduced from 40px) */
	:global(.flag-icon) {
		width: 32px !important;
		height: 32px !important;
	}

	/* Medium screens (tablets) */
	@media screen and (max-width: 56.25em) {
		.button-container {
			gap: 0.5rem;
		}

		:global(.flag-icon) {
			width: 26px !important;
			height: 26px !important;
		}
	}

	/* Small screens (mobile) */
	@media screen and (max-width: 37.5em) {
		.button-container {
			gap: 0.3rem;
		}

		:global(.flag-icon) {
			width: 20px !important;
			height: 20px !important;
		}
	}
</style>
