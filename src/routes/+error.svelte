<script lang="ts">
    export let error;
    export let status;
  
    const is404 = status === 404;
  </script>
  
  <section class="flex flex-col items-center justify-center min-h-screen text-white px-6 text-center">
    <h1 class="text-6xl font-bold mb-4">{status}</h1>
  
    {#if is404}
      <p class="text-2xl mb-6">Oops! This page is not available at the moment.</p>
      <p class="mb-10 text-gray-400">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
    {:else}
      <p class="text-xl mb-6">{error?.message || 'Something went wrong.'}</p>
    {/if}
  
    <a
      href="/"
      class="inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 transition"
    >
      ⬅️ Go back to the homepage
    </a>
  </section>
  