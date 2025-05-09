<!-- src/lib/components/Pagination.svelte -->
<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let onPageChange: (page: number) => void;
  
    const pagesToShow = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
          pages.push(i);
        }
      }
      return pages;
    };
  </script>
  
  <div class="mt-6 flex flex-wrap justify-center gap-2">
    {#if currentPage > 1}
      <button
        on:click={() => onPageChange(currentPage - 1)}
        class="rounded bg-gray-800 px-3 py-1 text-white hover:bg-gray-700"
      >
        ← Previous
      </button>
    {/if}
  
    {#each pagesToShow() as page, index (page)}
      {#if index > 0 && page - pagesToShow()[index - 1] > 1}
        <span class="px-2 text-gray-400">...</span>
      {/if}
      <button
        on:click={() => onPageChange(page)}
        class={`rounded px-3 py-1 ${
          page === currentPage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {page}
      </button>
    {/each}
  
    {#if currentPage < totalPages}
      <button
        on:click={() => onPageChange(currentPage + 1)}
        class="rounded bg-gray-800 px-3 py-1 text-white hover:bg-gray-700"
      >
        Next →
      </button>
    {/if}
  </div>
  