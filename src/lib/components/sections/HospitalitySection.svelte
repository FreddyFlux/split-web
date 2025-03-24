<script lang="ts">
	interface SanityProps {
		data: {
			hospitalitySections: ProcessedHospitalitySection[];
			hospitality: ProcessedHospitality[];
		};
	}

	let { data }: SanityProps = $props();
</script>

<section class="hospitality-section container" id="hospitality">
	<h2 class="hospitality-title mb-s">{data.hospitalitySections[0].hospitalityHeadline}</h2>
	<p class="hospitality-description mb-m">{data.hospitalitySections[0].hospitalityContent}</p>

	<div class="hospitality-container">
		{#each data.hospitality as hospitality}
			<a
				href="/{data.hospitalitySections[0].language}/cuisine/{hospitality.slug}"
				class="hospitality-card"
			>
				<h3 class="hospitality-title mb-s">{hospitality.hospitalityHeadline}</h3>
				<img
					class="hospitality-image"
					src={hospitality.image}
					alt={hospitality.hospitalityHeadline}
				/>
			</a>
		{/each}
	</div>
</section>

<style>
	.hospitality-section {
		padding: 9vh 0;
	}

	.hospitality-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.hospitality-title {
		font-weight: 600;
	}

	.hospitality-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 20px;
	}

	.hospitality-card {
		text-decoration: none;
		color: inherit;
		display: block;
		transition: transform 0.2s ease-in-out;
	}

	.hospitality-card:hover {
		transform: translateY(-5px);
	}
</style>
