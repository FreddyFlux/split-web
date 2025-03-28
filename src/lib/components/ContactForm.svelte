<script lang="ts">
	import { Button, IntTel } from '$components';

	interface ContactFormProps {
		data: {
			contactForm: ProcessedContactForm;
		};
	}

	let { data }: ContactFormProps = $props();

	const {
		formHeadline,
		formTitle,
		formDescription,
		nameInputPlaceholder,
		emailInputPlaceholder,
		messageInputPlaceholder,
		submitButtonText,
		successMessage,
		loadingMessage,
		errorMessage,
		language
	} = data.contactForm;

	let contactName = $state('');
	let contactMail = $state('');
	let contactPhone = $state<string | null>(null);
	let informationAboutProject = $state('');
	let isFormInvalid = $state(false);
	let isEmailSent = $state(false);
	let showErrorMessage = $state(false);
	let isLoading = $state(false);

	async function onSubmit(event: Event) {
		event.preventDefault();

		if (contactMail && contactName && contactPhone && informationAboutProject) {
			// show user that something happend
			isLoading = true;
			// send data to project
			const response = await fetch('/api/send-mail', {
				method: 'POST',
				body: JSON.stringify({
					contactName,
					contactMail,
					contactPhone, // Use the E164 formatted phone number
					informationAboutProject
				}),
				headers: { 'Content-type': 'application/json' }
			});
			isLoading = false;
			if (response.ok) {
				isEmailSent = true;
			} else {
				showErrorMessage = true;
			}
		} else {
			// trying to submit an incomplete/invalid form
			isFormInvalid = true;
		}
	}

	function handlePhoneChange(event: CustomEvent<{ value: string | null; valid: boolean }>) {
		contactPhone = event.detail.value;
		isFormInvalid = false;
	}

	$effect(() => {
		if (
			contactName ||
			contactMail ||
			contactPhone ||
			informationAboutProject ||
			!contactName ||
			!contactMail ||
			!contactPhone ||
			!informationAboutProject
		) {
			isFormInvalid = false;
		}
	});
</script>

<h2 class="contact-form container mt-l">{formHeadline}</h2>
<div class="form-container container mt-m">
	{#if isEmailSent}
		<div class="spinner-container">
			<h3>{successMessage}</h3>
		</div>
	{:else if isLoading}
		<div class="spinner-container">
			<div class="spinner"></div>
			<h3>{loadingMessage}</h3>
		</div>
	{:else if showErrorMessage}
		<h3>
			{errorMessage} <a href="mailto:fredrik@digidevs.no" class="link">fredrik@digidevs.no</a>
		</h3>
	{:else}
		<div class="form-text mb-m">
			<h3 class="bold mb-s">{formTitle}</h3>
			{#each formDescription as description}
				<p>
					{description}
				</p>
			{/each}
		</div>

		<form>
			<input
				type="text"
				class="text-input mb-s"
				class:input-error={isFormInvalid && !Boolean(contactName.length)}
				placeholder={nameInputPlaceholder}
				bind:value={contactName}
			/>
			<input
				type="text"
				class="text-input mb-s"
				class:input-error={isFormInvalid && !Boolean(contactMail.length)}
				placeholder={emailInputPlaceholder}
				bind:value={contactMail}
			/>
			<IntTel
				value={contactPhone}
				isInvalid={isFormInvalid && !contactPhone}
				on:change={handlePhoneChange}
			/>
			<textarea
				placeholder={messageInputPlaceholder}
				class:input-error={isFormInvalid && !Boolean(informationAboutProject.length)}
				bind:value={informationAboutProject}
			></textarea>
			<Button onclick={onSubmit} className="btn-send">{submitButtonText}</Button>
		</form>
	{/if}
</div>

<style>
	.form-container {
		display: flex;
		justify-content: space-between;
	}

	@media screen and (max-width: 56.25em) {
		.form-container {
			flex-direction: column;
		}
	}

	.form-text {
		width: 39%;
	}

	@media screen and (max-width: 56.25em) {
		.form-text {
			width: 100%;
		}
	}

	.form-text p {
		font-size: 1.8rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 45%;
		padding: 1rem 0;
	}

	@media screen and (max-width: 56.25em) {
		form {
			width: 60%;
		}
	}

	@media screen and (max-width: 37.5em) {
		form {
			width: 100%;
		}
	}

	form * {
		font-size: 2rem;
		font-family: 'Inter Tight', sans-serif;
		font-weight: 500;
		color: black;
	}

	textarea,
	input {
		width: 100%;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: 8px;
		padding: 0.5rem 1.2rem;
		outline: none;
		border: none;
	}

	/* Add Button styling to ensure it matches the width of other form elements */
	:global(form .btn-send) {
		width: 60%;
		justify-content: center;
	}

	input {
		height: 4.8rem;
	}

	textarea {
		height: 12rem;
		margin-bottom: 4rem;
	}

	textarea::placeholder,
	input::placeholder {
		font-size: 2rem;
		font-weight: 400;
	}

	.input-error {
		background-color: rgba(223, 87, 87, 0.667);
	}

	.input-error::placeholder {
		color: white;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: black;
		border-radius: 50%;
		width: 1.6rem;
		height: 1.6rem;
		display: inline-block;
		margin-right: 1rem;
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spinner-container {
		display: flex;
	}
</style>
