<script lang="ts">
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import { createEventDispatcher } from 'svelte';
	import type { DetailedValue, CountryCode, E164Number } from 'svelte-tel-input/types';

	// Props
	const props = $props();
	const value = $derived(props.value ?? null);
	const isInvalid = $derived(props.isInvalid ?? false);

	// Component state
	let selectedCountry = $state<CountryCode | null>('NO');
	let localValue = $state(value);
	let localIsInvalid = $state(isInvalid);
	let valid = $state(true);
	let detailedValue = $state<DetailedValue | null>(null);

	// Events
	const dispatch = createEventDispatcher<{
		change: { value: E164Number | null; valid: boolean };
	}>();

	function handlePhoneChange() {
		localIsInvalid = false;
		dispatch('change', { value: localValue, valid });
	}

	// Update localValue when prop value changes
	$effect(() => {
		localValue = value;
	});

	// Update localIsInvalid when prop isInvalid changes
	$effect(() => {
		localIsInvalid = isInvalid;
	});

	// Dispatch changes to parent
	$effect(() => {
		dispatch('change', { value: localValue, valid });
	});
</script>

<div class="tel-input-container mb-s">
	<select
		class="country-select"
		aria-label="Select country code"
		name="Country"
		onchange={(e) => {
			selectedCountry = e.currentTarget.value as CountryCode;
		}}
	>
		<option value={null} hidden={selectedCountry !== null}>Please select</option>
		{#each normalizedCountries as currentCountry (currentCountry.id)}
			<option
				value={currentCountry.iso2}
				selected={currentCountry.iso2 === selectedCountry}
				aria-selected={currentCountry.iso2 === selectedCountry}
			>
				{currentCountry.iso2} (+{currentCountry.dialCode})
			</option>
		{/each}
	</select>
	<TelInput
		country={selectedCountry}
		on:updateCountry={(e) => (selectedCountry = e.detail)}
		value={localValue}
		on:updateValue={(e) => (localValue = e.detail)}
		on:updateValid={(e) => (valid = e.detail)}
		on:updateDetailedValue={(e) => {
			if (e.detail) {
				detailedValue = e.detail as DetailedValue;
			} else {
				detailedValue = null;
			}
		}}
		class={`basic-tel-input ${localIsInvalid ? 'input-error' : ''}`}
		placeholder="Phone number"
		on:input={handlePhoneChange}
	/>
</div>

<style>
	.tel-input-container {
		display: flex;
		gap: 1rem;
		width: 100%;
	}

	.country-select {
		height: 4.8rem;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: 8px;
		padding: 0.5rem 1.2rem;
		outline: none;
		border: none;
		font-size: 2rem;
		font-weight: 400;
		font-family: 'Inter Tight', sans-serif;
		width: 30%;
		min-width: 120px;
	}

	:global(.basic-tel-input) {
		height: 4.8rem;
		background-color: rgba(0, 0, 0, 0.035);
		font-size: 2rem;
		font-weight: 400;
		border-radius: 8px;
		padding: 0.5rem 1.2rem;
		outline: none;
		border: none;
		font-family: 'Inter Tight', sans-serif;
		flex: 1;
	}

	:global(.basic-tel-input::placeholder) {
		font-size: 2rem;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.5);
	}

	:global(.basic-tel-input.input-error) {
		background-color: rgba(223, 87, 87, 0.667);
	}

	:global(.basic-tel-input.input-error::placeholder) {
		color: white;
	}

	:global(.basic-tel-input.input-error input) {
		color: white;
	}
</style>
