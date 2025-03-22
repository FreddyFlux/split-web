<script lang="ts">
	import Icon from '@iconify/svelte';

	export let setLanguage: (language: string) => void;
</script>

<div class="button-container">
	<button onclick={() => setLanguage('en')}
		><Icon icon="flagpack:gb-ukm" width="32" height="24"></Icon></button
	>
	<button onclick={() => setLanguage('no')}
		><Icon icon="flagpack:no" width="32" height="24"></Icon></button
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
