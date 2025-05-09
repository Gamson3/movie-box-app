// src/lib/types/favourite.ts 
// import type { Media } from "./media";


export interface Favourite {
  movieId: number;
  title: string;
  posterPath: string;
  userId?: string;        // Optional, since it's implicit in Firestore path
  addedAt?: string;       // Optional Firestore timestamp
}