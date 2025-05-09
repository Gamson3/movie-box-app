<!-- src/routes/+page.svelte -->
<script lang="ts">
    import type { Media } from '$lib/types/media';    // type import
    import MovieList from '$lib/components/MovieList.svelte';
	import { page } from '$app/state';
	import SearchBar from '$lib/components/SearchBar.svelte';

    export let data: {
	  	trendingMovies: Media[];
	  	latestMovies: Media[];
	  	latestTVShows: Media[];
	  };
    const { trendingMovies, latestMovies, latestTVShows } = data;
  </script>

  <SearchBar />
  <MovieList title="Trending Movies" movies={trendingMovies} />
  <MovieList title="Latest Movies" movies={latestMovies} />
  <!-- <MovieList title="Latest TV Shows" movies={latestTVShows} /> -->
  
  