<script lang="ts">
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import Icon from '@iconify/svelte';

	let { data } = $props();

	const {
		placesTitle,
		placesDescription,
		name,
		location,
		slug,
		image,
		dateStartSeason,
		dateEndSeason,
		imageGallery,
		content,
		amenities,
		placeData,
		urlLinks,
		language
	} = data.place[0];

	let images = $state([...imageGallery]);

	function getTagFromStyle(style: ProcessedTextContent['style']): string {
		if (style === 'normal') {
			return 'p';
		} else {
			return style;
		}
	}
</script>

<div class="place-container container">
	<div class="place-header">
		<div class="place-header-data">
			<h1>{name}</h1>
			<p>{location}</p>
		</div>
		<div class="place-header-icons">
			{#each placeData as data}
				<div class="place-header-icon">
					<Icon icon={data.iconClass} width="32" height="32"></Icon>
					<p class="icon-text">{data.placeData}</p>
				</div>
			{/each}
		</div>
	</div>

	<ImageGallery {images} />

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
	.place-container {
		margin-top: 5vh;
		padding: 9rem 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.place-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 2vh;
	}

	.place-header-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.place-header-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}

	.place-header-icon {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.icon-text {
		margin-top: 5px;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.place-content {
		margin-top: 5vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
