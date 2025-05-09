// src/routes/api/search/live-search/+server.ts
import { VITE_TMDB_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  let query = url.searchParams.get('query')?.trim() ?? '';  // Trim spaces
  
  if (!query || query.trim() === '') {
    return json([]);
  }

  query = query.replace(/[^\w\s]/gi, '');  // Remove special characters

  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1&api_key=${VITE_TMDB_API_KEY}`;
  const res = await fetch(apiUrl);

  if (!res.ok) return json([]);

  const data = await res.json();
  return json(data.results); // only the array for live search
}
