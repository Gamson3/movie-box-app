// src/routes/tv/[id]/+page.ts
import type { PageLoad } from './$types';
import { tmdbClient } from '$lib/api/tmdb';
import type { Credits, Media } from '$lib/types/media';

export const load: PageLoad = async ({ params, fetch }) => {
  const id = Number(params.id);
  const tmdb = tmdbClient(fetch);

  const [tvShow, credits]: [Media | null, Credits | null] = await Promise.all([
    tmdb.fetchTVShowDetails(id),
    tmdb.fetchTVShowCredits(id)
  ]);

  return {
    tvShow,
    credits
  };
};
