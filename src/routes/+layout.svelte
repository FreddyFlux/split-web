<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { Navbar } from '$components';
	let { children }: { children: Snippet } = $props();
</script>

<Navbar />
{@render children()}
