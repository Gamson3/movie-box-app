<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
	import { goto } from "$app/navigation";

  export let homeLink: string = '/';   // Exported variables for navigation links
  export let favouritesLink: string = '/favourites';

  import { logout } from "$lib/firebase/auth";
	import { user } from "$lib/stores/user";

  const handleLogout = async () => {
    await logout();
  };
</script>
  
<header class="bg-gray-900 text-white shadow-md">
  <nav class="flex items-center justify-between max-w-7xl mx-auto py-4">
    <a href={homeLink} class="text-xl flex items-center font-bold">
      <span>🎬</span>
      <span>MovieBox</span>
    </a>
    <ul class="flex space-x-6">
      <li><a href={homeLink} class="hover:text-gray-400">Home</a></li>
      <li><a href={favouritesLink} class="hover:text-gray-400">Favourites</a></li>
      
      {#if $user}
        <li>
          <span class="text-sm text-gray-300">Welcome, {$user.displayName}</span>
        </li>
        <li>
          <a href="/">
            <button on:click={handleLogout} class="hover:text-gray-400 cursor-pointer">
              Log out
            </button>
          </a>
        </li>
      {:else}
        <li><a href="/auth" class="hover:text-gray-400">Login/Signup</a></li>
      {/if}
    </ul>
  </nav>
</header>

  