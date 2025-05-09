<script lang="ts">
	import { goto } from '$app/navigation';
    import { onDestroy } from 'svelte';
    // import { writable } from 'svelte/store';
  
    let query = '';
    let results: any[] = [];
    let loading = false;
    let debounceTimeout: NodeJS.Timeout;
  
    // Function to fetch search results
    async function fetchResults(searchTerm: string) {
      if (!searchTerm) {
        results = [];
        return;
      }
      loading = true;
      const cleanSearchTerm = searchTerm.trim().replace(/[^\w\s]/gi, '');
      try {
        const res = await fetch(`/api/search/live-search?query=${encodeURIComponent(cleanSearchTerm)}`);
        if (res.ok) {
          results = await res.json();
        } else {
          console.error('Search API error:', res.statusText);
          results = [];
        }
      } catch (err) {
        console.error('Fetch error:', err);
        results = [];
      } finally {
        loading = false;
      }
    }
  
    // Debounce input
    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      query = target.value;
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => fetchResults(query), 300);
    }

    function handleSubmit() {
        if (query.trim()){
            goto(`/search?query=${encodeURIComponent(query)}&page=1`);
            results = [];   // close dropdown
        }
    }

    function handleResultClick(movieId: number) {
      goto(`/movie/${movieId}`);  // Navigate to movie details 
      results = []; // clear dropdown after navigation
    }
  
    // Cleanup on component destroy
    onDestroy(() => {
      clearTimeout(debounceTimeout);
    });
</script>
  
<div class="relative container max-w-2xl mx-auto my-8 z-10">
  <form 
  on:submit|preventDefault={handleSubmit}
  class="flex gap-0 items-center text-gray-800 mx-auto"
  >
      <input
        type="text"
        placeholder="Search movies..."
        on:input={handleInput}
        bind:value={query}
        class="w-full px-4 py-2 bg-white rounded-l outline-none"
        aria-label="Search movies"
      />
      <button 
        type="submit" 
        class="text-center font-medium px-4 py-2 bg-[#f5c518] rounded-r cursor-pointer"
      >
          Search
      </button>
  </form>
  
  {#if loading}
    <div class="absolute top-full left-0 w-full bg-gray-600 mt-1 p-2">
      Loading...
    </div>
  {:else if results.length > 0}
    <ul class="absolute top-full left-0 w-full bg-gray-600 mt-1 rounded-b shadow-md z-20">
      {#each results.slice(0,6) as movie}
          <li class="p-2 hover:bg-gray-400 cursor-pointer">
              <button 
               on:click={() => handleResultClick(movie.id)}
               on:keydown={(e) => e.key === 'Enter' && handleResultClick(movie.id)}
               class="block w-full text-left p-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-500 cursor-pointer" 
              >
                  {movie.title}
              </button>
          </li>
      {/each}
    </ul>
  {/if}
</div>
