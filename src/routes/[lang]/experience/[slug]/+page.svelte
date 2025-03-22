<script lang="ts">
	import Icon from '@iconify/svelte';

	let { data } = $props();

	const { experienceHeadline, content } = data.experience[0];

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}
</script>

<div class="experience-container container">
	<div class="experience-header">
		<div class="experience-header-data">
			<h1>{experienceHeadline}</h1>
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
	.experience-container {
		margin-top: 5vh;
		padding: 9rem 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.experience-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.experience-header-data {
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
