<!-- src/lib/components/MovieList.svelte -->
<script lang="ts">
  import MovieCard from './MovieCard.svelte';
  import type { Media } from '$lib/types/media';

  export let movies: Media[] = [];
  export let title: string;
</script>
  
<section class="w-full px-32 py-8">
  <h2 class="text-2xl font-bold mb-8">{title}</h2>

  <div class="movies-grid">
    {#each movies as movie}
      <MovieCard {movie} />
    {/each}
  </div>
</section>