// src/lib/api/favourites.ts
import { writable, get } from 'svelte/store';
import type { Media } from '$lib/types/media';
import type { Favourite } from '$lib/types/favourite';
import { auth } from '$lib/firebase/client';

export const favStore = writable<Favourite[]>([]);
let hasFetched = false;

// === FETCH ===
export async function fetchFavourites(): Promise<Favourite[]> {
	if (hasFetched) return get(favStore); // avoid duplicate fetches
	hasFetched = true;

	try {
		const user = auth.currentUser;
		if (!user) {
			favStore.set([]);
			return [];
		}

		const token = await user.getIdToken();
		const res = await fetch('/api/favourites', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

    if (!res.ok) {
			throw new Error(`API Error: ${await res.text()}`);
		}

		const data: Favourite[] = await res.json();

		favStore.set(data);
		return data;
    
	} catch (err) {
		console.error('Failed to fetch favourites', err);
		favStore.set([]);
		return [];
	}
}

// === ADD ===
export async function addFavourite(movie: Media): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in first.');
      return false;
    }

    const token = await user.getIdToken();

    const res = await fetch('/api/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title ?? movie.name,
        posterPath: movie.poster_path
      })
    });

    if (res.status === 409) {
      console.log('Already favourited.');
      return false; // Prevent duplicates
    }

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return true; // Success
  } catch (err) {
    console.error('addFavourite() - Server error:', err);
    return false;
  }
}


// === REMOVE ===
export async function removeFavourite(movieId: number): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in first.');
      return false;
    }

    const token = await user.getIdToken();
    const res = await fetch('/api/favourites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ movieId })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return true;
  } catch (err) {
    console.error('removeFavourite() - Error:', err);
    return false;
  }
}


// === UTILS ===
export function isFavourite(movieId: number, favs: Favourite[]) {
  return favs.some(f => f.movieId === movieId);
}

export function resetFavourites() {
	hasFetched = false;
	favStore.set([]);
}
