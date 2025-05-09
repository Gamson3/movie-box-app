
import { error } from '@sveltejs/kit';

export function load() {
    throw error(404, 'This page is not available yet');
}