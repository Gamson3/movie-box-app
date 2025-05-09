<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-gray-950 text-white">
	<Navbar />
	<main class="flex-1 w-full flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>

