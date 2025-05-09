// src/lib/types/media.ts 
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: unknown[]; 
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Media {
  id: number;
  name?: string;
  title?: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average?: number;

  // Movie or TV release date
  release_date?: string;
  first_air_date?: string;

  // New additions for details page
  genres?: Genre[];
  runtime?: number; 
  number_of_episodes?: number; // Applicable to TV shows
  production_countries?: ProductionCountry[];
  production_companies?: ProductionCompany[];
}

