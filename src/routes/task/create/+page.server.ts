import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({ url }) => {
	// const item = url.searchParams.get('item');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	item: async ({ request, url }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk', url.searchParams.get('item'));

		const data = await request.formData();
		// data.forEach((value, key) => console.log('iteemk ey:', key, value));
		const item = data.get('item');
		// const name = data.get('name') ? data.get('name') : '';
		const newTask = await prisma.task.create({
			data: {
				statusId: 1,
				itemId: parseInt(item)
				// status: { connect: { id: 2 } },
				// item: { connect: { id: parseInt(url.searchParams.get('item')) } }
			}
		});

		// console.log('jepure', newItem);
		// throw redirect(303, `/task/${newItem.id}/edit`);
		throw redirect(303, `/task/${newTask.id}/edit?item=${parseInt(item)}`);
	}
} satisfies Actions;
