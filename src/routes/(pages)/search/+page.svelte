<!-- Shows searched results with pagination -->
<!-- src/routes/search/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Pagination from '$lib/components/Pagination.svelte';
	import MovieList from '$lib/components/MovieList.svelte';

	// Auto-subscribe to the `page` store using the $ prefix
	// These reactive declarations will run every time $page updates
	$: results = $page.data.results ?? [];
	$: totalPages = $page.data.totalPages ?? 0;
	$: currentPage = $page.data.currentPage ?? 1;
	$: query = $page.data.query ?? '';

	function goToPage(pageNumber: number) {
		goto(`/search?query=${encodeURIComponent(query)}&page=${pageNumber}`);
	}
</script>

<section class="container mx-auto py-8 text-white">
	{#if query}
		<h1 class="text-2xl mb-8 px-32 font-medium">Search results for "{query}"</h1>
		{#if results.length > 0}
			<MovieList movies={results} title="" />
		{:else}
			<p>No results found.</p>
		{/if}
	{:else}
		<p>Please enter a search query.</p>
	{/if}

	<!-- Pagination controls (optional enhancement) -->
	{#if totalPages > 1}
		<Pagination {currentPage} {totalPages} onPageChange={goToPage} />
	{/if}
</section>


