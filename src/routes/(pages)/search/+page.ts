// src/routes/search/+page.ts
export const prerender = false; // Prevent SvelteKit from statically prerendering this dynamic route
export async function load({ url, fetch }) {
  console.log("Loading data...")
  
	const query = url.searchParams.get('query') ?? '';
	const page = url.searchParams.get('page') ?? '1';

	if (!query) {
		return { results: [], totalPages: 0, currentPage: 1, query };
	}

  console.log('Loading data for page:', page);

	const res = await fetch(`/api/search/full-search?query=${encodeURIComponent(query)}&page=${page}`);
	if (!res.ok) {
		return {
			results: [],
			totalPages: 0,
			currentPage: Number(page),
			query,
			error: 'Failed to fetch results'
		};
	}

	const data = await res.json();

	return {
		results: data.results,
		totalPages: data.total_pages,
		currentPage: Number(data.page),
		query
	};
}
