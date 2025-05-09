<!-- src/lib/components/MovieDetails.svelte -->
<script lang="ts">
	import type { CastMember, Media } from '$lib/types/media';
	import type { Credits } from '$lib/types/media';

	export let movie: Media;
	export let credits: Credits;

	const topCast = credits?.cast?.slice(0, 5).map((actor: CastMember) => actor.name).join(', ') ?? 'N/A';
  	const genres = movie?.genres?.map(genre => genre.name).join(', ') ?? 'N/A';
  	const countries = movie?.production_countries?.map(country => country.name).join(', ') ?? 'N/A';
  	const productionCompanies = movie?.production_companies?.map(company => company.name).join(', ') ?? 'N/A';
</script>

<svelte:head>
  <title>{movie?.title ?? 'Movie Details'}</title>
</svelte:head>

{#if movie}
  <section 
    class="relative bg-cover bg-center bg-no-repeat min-h-[80vh] text-gray-100"
    style="background-image: url('https://image.tmdb.org/t/p/original{movie.backdrop_path}')"
  >
  <!-- Overlay -->
  <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative container max-w-6xl mx-auto px-4 py-10">
      <div class="flex flex-col md:flex-row gap-10 items-start"> 
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          class="rounded-xl shadow-2xl w-full max-w-[300px]"
        />

        <div>
          <h1 class="text-5xl font-bold mb-6">{movie.title}</h1>

          <div class="flex items-center space-x-4 mb-6 text-sm md:text-base">
            <span class="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
            <span class="text-gray-300">
              {movie.release_date?.split('-')[0] ?? 'Unknown Year'}
            </span>
          </div>

          <h2 class="text-normal font-medium ">Overview: </h2>
          <p class="text-sm font-light text-gray-200 mb-8 leading-relaxed tracking-wide">
            {movie.overview}
          </p>

          <!-- Movie Info Block -->
          <div class="grid grid-cols-2 gap-10 text-sm font-light tracking-wide">
            <div>
              <p><span class="font-medium">Released:</span> {movie.release_date ?? 'N/A'}</p>
              <p><span class="font-medium">Genre:</span> {genres}</p>
              <p><span class="font-medium">Casts:</span> {topCast}</p>
            </div>
            <div>
              <p><span class="font-medium">Duration:</span> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
              <p><span class="font-medium">Country:</span> {countries}</p>
              <p><span class="font-medium">Production:</span> {productionCompanies}</p>
            </div>
          </div>

          <div class="mt-10">
            <a href="/" class="text-blue-300 hover:underline text-base">
              &larr; Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
{:else}
  <p class="text-center text-red-400 text-lg mt-10">Movie not found.</p>
{/if}