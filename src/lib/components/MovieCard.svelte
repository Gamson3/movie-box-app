<!-- src/lib/components/MovieCard.svelte -->
<script lang="ts">
  import { favStore, addFavourite, removeFavourite, isFavourite } from '$lib/api/favourites';
  import type { Media } from '$lib/types/media';
  import { onMount } from 'svelte';
  import { derived, get } from 'svelte/store';
  import { authReady, user } from '$lib/stores/user';
	import { auth } from '$lib/firebase/client';

  export let movie: Media;

  // Derived store: checks if this movie is in the favourites
  const isFavouritedStore = derived(favStore, ($favStore) =>
    isFavourite(movie.id, $favStore)
  );

async function toggleFavourite(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();

  const $isFavourited = get(isFavouritedStore);
  const current = get(favStore);

  if ($isFavourited) {
    favStore.set(current.filter(f => f.movieId !== movie.id));

    const success = await removeFavourite(movie.id);
    if (!success) {
      favStore.set(current); // rollback
      alert("Failed to remove favourite");
    }
  } else {
    const newFav = {
      movieId: movie.id,
      title: movie.title ?? movie.name ?? '',
      posterPath: movie.poster_path,
      userId: get(user)?.uid ?? ''
    };

    favStore.set([...current, newFav]);

    const success = await addFavourite(movie);
    if (!success) {
      favStore.set(current); // rollback
      console.log("Failed to add favourite");
    }
  }
}

</script>

<div class="max-w-[200px] bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition transform">
  <a href={`/movie/${movie.id}`} class="block relative">
    <div class="relative aspect-[2/3]">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title} 
        class="w-full h-full object-cover rounded-t-lg " 
      />
      <!-- dark overlay -->
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/10 to-black/80 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition">
        
      <!-- Heart Button -->
      <button
        class="absolute top-4 right-4 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg z-10 hover:bg-black/80 cursor-pointer"
        on:click={toggleFavourite}
        type="button"
      >
        {#if $isFavouritedStore}
          ❤︎
        {:else}
          ♡
        {/if}
      </button>
      </div>
    </div>
  </a>
    <div class="p-4">
      <div class="flex justify-between text-gray-400 text-sm mb-2">
        <span>★ {movie.vote_average?.toFixed(1) ?? "N/A"}</span>
        <span>{movie.release_date?.split("-")[0]}</span>
      </div>
      <a href={`/movie/${movie.id}`} class="text-white hover:text-yellow-400">
        <h3>
          {movie.title ?? movie.name}
        </h3>
      </a>
      
    </div>
</div>
