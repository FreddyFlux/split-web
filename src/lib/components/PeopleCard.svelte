<script>
	export let imageUrl = '';
	export let name = '';
	export let title = '';
	export let description = '';
	export let phone = '';
	export let email = '';
</script>

<div class="card">
	<div class="image-container">
		<img src={imageUrl} alt={name} />
	</div>

	<div class="content">
		<h3 class="name">{name}</h3>
		<p class="title">{title}</p>
		<p class="description">{description}</p>

		<div class="contact-info">
			{#if phone}
				<a href="tel:{phone}" class="contact-link">
					<span class="icon">📞</span>
					{phone}
				</a>
			{/if}
			{#if email}
				<a href="mailto:{email}" class="contact-link">
					<span class="icon">✉️</span>
					{email}
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		border-radius: 8px;
		box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.1);
		padding: 1.5rem;
		width: 300px;
		text-align: center;
	}

	.image-container {
		width: 150px;
		height: 150px;
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
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
		color: #333;
	}

	.title {
		font-size: 1rem;
		color: #666;
		margin: 0;
	}

	.description {
		font-size: 0.9rem;
		color: #555;
		margin: 0.5rem 0;
		line-height: 1.4;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.contact-link {
		color: #0066cc;
		text-decoration: none;
		font-size: 0.9rem;
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
