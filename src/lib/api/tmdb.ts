// src/lib/api/tmdb.ts
import type { Credits, Media } from '$lib/types/media';
import { safeFetch } from './fetchHelper';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;; 
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


export function tmdbClient(fetch: typeof globalThis.fetch) {
  const currentYear = new Date().getFullYear();
  const fromDate = `${currentYear}-01-01`;
  const toDate = `${currentYear}-12-31`;

  return {
    fetchTrendingMovies: async (): Promise<Media[]> => {
      const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }
      const data = await response.json();
      return data.results;
    },

    fetchMovieDetails: async (id: number): Promise<Media | null> => {
      const url = `${BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US`;
      return await safeFetch<Media>(url, fetch);
    },

    fetchMovieCredits: async (id: number): Promise<Credits | null> => {
      const url = `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
      return await safeFetch<Credits>(url, fetch);
    },

    fetchLatestMovies: async (): Promise<Media[]> => {
      const url = `${BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&vote_count.gte=20&include_adult=false&include_video=false&page=1`;

      const data = await safeFetch<{ results: Media[] }>(url, fetch);
      return data?.results ?? [];
    },
    
    fetchLatestTVShows: async (): Promise<Media[]> => {
      const today = new Date().toISOString().split('T')[0];
      const url = `${BASE_URL}/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&first_air_date.lte=${today}&include_null_first_air_dates=false&page=1`;
    
      const data = await safeFetch<{ results: Media[] }>(url, fetch);
      return data?.results ?? [];
    }, 

    // Fetch TV Show Details by ID
    fetchTVShowDetails: async (id: number): Promise<Media | null> => {
      const url = `${BASE_URL}/tv/${id}?api_key=${apiKey}&language=en-US`;
      return await safeFetch<Media>(url, fetch);
    },

    // Fetch TV Show Credits by ID
    fetchTVShowCredits: async (id: number): Promise<Credits | null> => {
      const url = `${BASE_URL}/tv/${id}/credits?api_key=${apiKey}&language=en-US`;
      return await safeFetch<Credits>(url, fetch);
    }
    
  };
}

// // Function to fetch trending movies
// export const fetchTrendingMovies = async (): Promise<Movie[]> => {
//   const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${apiKey}`);
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch trending movies');
//   }
  
//   const data = await response.json();
//   return data.results;  // Returning movie data from the API response
// };

// // Function to fetch movie details by ID (UPDATED to use safeFetch)
// export async function fetchMovieDetails(id: number): Promise<Movie | null> {
//   const url = `${BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US`;
//   return await safeFetch<Movie>(url);
// }

// export async function fetchMovieCredits(id: number): Promise<Credits | null> {
//   const url = `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
//   return await safeFetch<Credits>(url);
// }