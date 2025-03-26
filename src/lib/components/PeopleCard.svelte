<script lang="ts">
	interface PeopleCardProps {
		data: {
			contactPeople: ProcessedContactPeople[];
		};
	}

	let { data }: PeopleCardProps = $props();
</script>

<div class="contact-about mb-l mt-l">
	{#each data.contactPeople as person}
		<div class="card">
			<div class="image-container">
				<img src={person.image} alt={person.peopleName} />
			</div>

			<div class="content">
				<h3 class="name">{person.peopleName}</h3>
				<p class="title">{person.peopleTitle}</p>
				<p class="description">{person.peopleDescription}</p>

				<div class="contact-info">
					{#if person.peoplePhone}
						<a href="tel:{person.peoplePhone}" class="contact-link">
							<span class="icon">📞</span>
							{person.peoplePhone}
						</a>
					{/if}
					{#if person.peopleEmail}
						<a href="mailto:{person.peopleEmail}" class="contact-link">
							<span class="icon">✉️</span>
							{person.peopleEmail}
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.contact-about {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	.card {
		border-radius: 8px;
		box-shadow: 0 4rem 6rem 0.2rem rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		width: 300px;
		text-align: center;
	}

	.image-container {
		width: 16rem;
		height: 16rem;
		margin: 0 auto 1rem;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid #f0f0f0;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.name {
		font-size: 2.25rem;
		font-weight: 600;
		margin: 0;
		color: #333;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 400;
		color: #666;
		margin: 0;
	}

	.description {
		font-size: 1.1rem;
		color: #555;
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.contact-link {
		text-decoration: none;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.contact-link:hover {
		text-decoration: underline;
	}

	.icon {
		font-size: 1rem;
	}
</style>
