<!-- src/routes/movie/[id]/+page.svelte -->
<script lang="ts">
	import MediaDetails from '$lib/components/MediaDetails.svelte';
	// import MovieDetails from '$lib/components/MovieDetails.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

  const { movie, credits } = data; 
</script>

{#if movie && credits}
  <MediaDetails media={movie} credits={credits} />
{:else}
  <p class="text-center text-red-400 text-lg mt-10">Media not found.</p>
{/if}