<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
    // Exported variables for navigation links
    export let homeLink: string = '/';
    // export let favouritesLink: string = '/favourites';
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="bg-gray-900 text-white py-10 mt-auto">
    <div class="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
      
        <a href={homeLink} class="text-xl font-bold">
            <div class="flex items-center text-2xl font-bold">
              <span>🎬</span>
              <span>MovieBox</span>
            </div>
        </a>
      
  
      <nav class="flex space-x-6 text-gray-400 text-sm">
        <!-- all the below pages are yet to be created only at the very end-->
        <a href="/about" class="hover:text-white transition">About</a> 
        <a href="/contact" class="hover:text-white transition">Contact</a>
        <a href="/privacy" class="hover:text-white transition">Privacy Policy</a>
      </nav>
  
      <p class="text-gray-600 text-xs">
        &copy; {currentYear} MovieBox. All rights reserved.
      </p>
  
    </div>
  </footer>
  