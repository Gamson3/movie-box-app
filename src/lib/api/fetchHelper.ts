// src/lib/api/fetchHelper.ts
export async function safeFetch<T>(url: string, fetch: typeof globalThis.fetch, options?: RequestInit): Promise<T | null> {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      const data = (await response.json()) as T;
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  }
  