<!-- src/lib/components/MediaDetails.svelte -->
<script lang="ts">
  import type { Media, Credits } from '$lib/types/media';

  export let media: Media;
  export let credits: Credits;

  // Common fields
  const title = media.title ?? media.name;
  const releaseDate = media.release_date ?? media.first_air_date;
  const rating = media.vote_average?.toFixed(1) ?? 'N/A';
  const overview = media.overview ?? 'No overview available.';
  const genres = media.genres?.map(g => g.name).join(', ') ?? 'N/A';
  const topCast = credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') ?? 'N/A';
  const countries = media.production_countries?.map(c => c.name).join(', ') ?? 'N/A';
  const productionCompanies = media.production_companies?.map(p => p.name).join(', ') ?? 'N/A';

  // Type-specific fields
  const isMovie = !!media.title;
  const durationOrEpisodes = isMovie
    ? `${media.runtime ?? 'N/A'} mins`
    : `${media.number_of_episodes ?? 'N/A'} episodes`;
</script>
  
<svelte:head>
  <title>{title}</title>
</svelte:head>


<section 
  class="relative bg-cover bg-center bg-no-repeat min-h-[80vh] text-gray-100"
  style="background-image: url('https://image.tmdb.org/t/p/original{media.backdrop_path}')"
>
  <!-- Overlay -->
  <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

  <!-- Content -->
  <div class="relative container max-w-6xl mx-auto px-4 py-10">
    <div class="flex flex-col md:flex-row gap-10 items-start">
      <img
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={title}
        class="rounded-xl shadow-2xl w-full max-w-[300px]"
      />

      <div>
        <h1 class="text-5xl font-bold mb-6">{title}</h1>

        <div class="flex items-center space-x-4 mb-6 text-sm md:text-base">
          <span class="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
            ★ {rating}
          </span>
          <span class="text-gray-300">
            {releaseDate?.split('-')[0] ?? 'Unknown Year'}
          </span>
        </div>

        <h2 class="text-normal font-medium">Overview:</h2>
        <p class="text-sm font-light text-gray-200 mb-8 leading-relaxed tracking-wide">
          {overview}
        </p>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 gap-10 text-sm font-light tracking-wide">
          <div>
            <p><span class="font-medium">Released:</span> {releaseDate ?? 'N/A'}</p>
            <p><span class="font-medium">Genre:</span> {genres}</p>
            <p><span class="font-medium">Cast:</span> {topCast}</p>
          </div>
          <div>
            <p><span class="font-medium">{isMovie ? 'Duration' : 'Episodes'}:</span> {durationOrEpisodes}</p>
            <p><span class="font-medium">Country:</span> {countries}</p>
            <p><span class="font-medium">Production:</span> {productionCompanies}</p>
          </div>
        </div>

        <div class="mt-10">
          <a href="/" class="text-blue-300 hover:underline text-base">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  </div>
</section>
  