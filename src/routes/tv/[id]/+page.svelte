<script lang="ts">
  import MediaDetails from '$lib/components/MediaDetails.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { tvShow, credits } = data; 
</script>

{#if tvShow && credits}
  <MediaDetails media={tvShow} credits={credits} />
{:else}
  <p class="text-center text-red-400 text-lg mt-10">Media not found.</p>
{/if}