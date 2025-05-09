// src/routes/api/search/full-search/+server.ts
import { VITE_TMDB_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  let query = url.searchParams.get('query')?.trim() ?? '';  // Trim spaces
  const page = url.searchParams.get('page') || '1';

  if (!query || query.trim() === '') {
    return json({ results: [], total_pages: 0, page: 1 });
  }

  query = query.replace(/[^\w\s]/gi, '');  // Remove special characters

  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${VITE_TMDB_API_KEY}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    return json({ error: 'Failed to fetch search results' }, { status: res.status });
  }

  const data = await res.json();
  // Sort results by popularity descending
  const sortedResults = data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity - a.popularity);

  return json({
    ...data,
    results: sortedResults,
  });
  // return json(data); // full payload for full page
}
