<!-- src/routes/favourites/+page.svelte  -->
<script lang="ts">
	import MovieList from '$lib/components/MovieList.svelte';
	import { onMount } from 'svelte';
	import { favStore, fetchFavourites } from '$lib/api/favourites';
	import { authReady, user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import type { Favourite } from '$lib/types/favourite';
	import type { Media } from '$lib/types/media';

  	let loading = true;
	let favourites: Favourite[] = [];
	let movies: Media[] = [];
	// let isAuthenticated = false;
	// let authChecked = false;

	
	// Derived state
	$: isAuthenticated = $authReady && $user;
	$: authChecked = $authReady;
	
	// Get the latest favourites from the store
	$: favourites = $favStore; 

	// Fetch favourites reactively when user changes
	$: if ($authReady) {
		if ($user) {
			loading = true;
			fetchFavourites()
				.catch((err) => console.error('Failed to fetch favourites:', err))
				.finally(() => loading = false);
		} else {
			loading = false;
		}
	}

	// Map favourites into simplified Media objects
	$: movies = favourites.map(fav => ({
		id: fav.movieId,
		title: fav.title,
		poster_path: fav.posterPath?? '',
		overview: '', 
	}));

	// onMount(async () => {
	// 	if ($authReady) {
	// 		authChecked = true;
	// 		isAuthenticated = !!$user;

	// 		if (isAuthenticated) {
	// 			await fetchFavourites()
	// 				.catch(err => console.error('Failed to fetch favourites:', err))
	// 				.finally(() => loading = false);
	// 		} else {
	// 			loading = false;
	// 		}
	// 	}
	// });
	function goToLogin() {
		goto('/auth');
	}

	function goToSignup() {
		goto('/auth?signup=true'); // optional query param to pre-select signup
	}
</script>

<svelte:head>
	<title>Favourite Movies</title>
</svelte:head>

<section class="container mx-auto w-full px-32 py-8">

	{#if loading}
		<div class="flex items-center justify-center py-10">
			<div class="animate-pulse text-xl text-white">Loading...</div>
		</div>

	{:else if !isAuthenticated}
		<div class="text-center text-white py-10 max-w-md mx-auto my-10 bg-gray-800 p-6 rounded-lg shadow-lg">
			<h2 class="text-xl mb-4">To view favourites, you must be logged in</h2>
			<div class="space-x-4 mt-6 flex flex-col gap-4">
				<button on:click={goToLogin} class="w-full bg-blue-600 px-4 py-2 rounded cursor-pointer">
					Log In
				</button>
				<button on:click={goToSignup} class="w-full px-4 py-2 border rounded cursor-pointer">
					Sign Up
				</button>
				<div class="mt-4">
					<a href="/" class="text-blue-300 hover:underline text-base">&larr; Back to Home</a>
				  </div>
			</div>
		</div>
	{:else if movies.length > 0}
		<MovieList {movies} title="Favourites" />
	{:else}
		<div class="flex items-center justify-center py-10">
			<div class="text-lg text-gray-400 text-center">
				<h2 class="text-2xl mb-8">You have no favourite movies yet.</h2>
				<p>
					Start adding movies to your favourites and they will appear here!
				</p>
			</div>
		</div>
	{/if}
</section>
