<script lang="ts">
	// add redirect logic, automatically routes to home after set seconds
	// import { goto } from '$app/navigation';
	// setTimeout(() => goto('/'), 10000);
</script>

<section class="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6 text-center">
	<!-- SVG Construction Icon -->
	<svg
		class="w-20 h-20 mb-6 text-yellow-400"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5M12 17.25V21m6.364-3.75L20.25 21M3.75 21l1.886-3.75m0 0L12 3.75l6.364 13.5M5.636 17.25h12.728" />
	</svg>

	<h1 class="text-5xl md:text-6xl font-bold mb-4">Coming Soon</h1>
	<p class="text-xl text-gray-300 mb-6 max-w-xl">
		This page is currently under construction. Please check back later!
	</p>
	<a
		href="/"
		class="mt-4 inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 transition"
	>
		⬅️ Back to Home
	</a>
</section>
