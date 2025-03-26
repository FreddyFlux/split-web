<script lang="ts">
	import Icon from '@iconify/svelte';

	export let setLanguage: (language: string) => void;
</script>

<div class="button-container">
	<button onclick={() => setLanguage('en')}
		><Icon icon="circle-flags:uk" width="40" height="40"></Icon></button
	>
	<button onclick={() => setLanguage('no')}
		><Icon icon="circle-flags:lang-no" width="40" height="40"></Icon></button
	>
</div>

<style>
	.button-container {
		display: flex;
		gap: 1rem;
	}

	.button-container button {
		background: none;
		border: none;
		cursor: pointer;
	}
</style>
