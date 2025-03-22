<script lang="ts">
	import Icon from '@iconify/svelte';

	let { data } = $props();

	const { hospitalityHeadline, content } = data.hospitality[0];

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}
</script>

<div class="hospitality-container container">
	<div class="hospitality-header">
		<div class="hospitality-header-data">
			<h1>{hospitalityHeadline}</h1>
		</div>
	</div>

	<div class="place-content">
		{#each content as block}
			{#if block.type === 'text'}
				<svelte:element this={getTagFromStyle(block.style)}>{block.textToRender}</svelte:element>
			{:else}
				<img class="content-image" src={block.url} alt="" />
			{/if}
		{/each}
	</div>
</div>

<style>
	.hospitality-container {
		margin-top: 5vh;
		padding: 9rem 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hospitality-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.hospitality-header-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.place-content {
		margin-top: 5vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
