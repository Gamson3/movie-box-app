// src/lib/stores/user.ts
import { writable } from 'svelte/store';
import { onUserChange } from '$lib/firebase/auth';

export const user = writable<import('firebase/auth').User | null>(null);
export const authReady = writable(false);

onUserChange((u) => {
	user.set(u);
	authReady.set(true);
});
