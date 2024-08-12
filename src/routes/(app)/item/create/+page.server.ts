import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

// import * as fs from 'fs';
// import { writeFileSync } from 'fs';

export const load = (async () => {
	// 	const response = await prisma.customer.findMany({
	// 		where: { parts: { some: {} } },
	// 		include: { parts: true }
	// 	});

	// 2.
	// return { data: response };
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		// const kkk = Object.fromEntries(await request.formData());
		console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('iteemk ey:', key, value));
		const id = data.get('id');
		const name = data.get('name') ? data.get('name') : '';
		const newItem = await prisma.item.create({
			data: {
				name
			}
		});

		console.log('jepure', newItem);
		throw redirect(303, `/item/${newItem.id}/edit`);
	}
} satisfies Actions;
