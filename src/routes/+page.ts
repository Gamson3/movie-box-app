// src/routes/+page.ts
import type { PageLoad } from './$types';
import { tmdbClient } from '$lib/api/tmdb';
import type { Media } from '$lib/types/media';

export const load: PageLoad = async ({ fetch }) => {
	const tmdb = tmdbClient(fetch);

	const trendingMovies: Media[] = await tmdb.fetchTrendingMovies();
	const latestMovies: Media[] = await tmdb.fetchLatestMovies();
	const latestTVShows: Media[] = await tmdb.fetchLatestTVShows();

	return { 
		trendingMovies,
		latestMovies,
		latestTVShows 
	};
};
