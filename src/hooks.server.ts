// import type { Handle } from '@sveltejs/kit';

// import { search } from '$lib/stores.svelte';

// export const handle: Handle = async ({ event, resolve }) => {

export const handle = async ({ event, resolve }) => {
	// search.active = false;
	// if (event.url.pathname.startsWith('/custom')) {
	// 	return new Response('custom response');
	// }
	// console.log('hooko', search.value, search.active);

	const response = await resolve(event);
	return response;
};
