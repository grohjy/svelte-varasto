import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { writeFileSync } from 'fs';

export const load = (async ({ params }) => {
	console.log('paraa', params.id);
	const response = await prisma.customer.findFirst({
		where: { id: parseInt(params.id) }
	});
	// console.log('looad', response);

	// 2.
	return { customer: response };
	// return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		// data.forEach((value, key) => console.log('edit key:', key, value));
		const shortname = data.get('shortname') as string;
		const logo = data.get('logo') as string;
		const content = data.get('content') as string;
		// console.log('jepu', data);
		const files = data.getAll('file') as File[];
		if (files && files.length > 0) {
			// console.log('fiiles:', files);
			files.forEach(async (file) => {
				const buffer = await file.arrayBuffer();
				const data = Buffer.from(buffer);
				writeFileSync(`static/images/${file.name}.jpg`, data);
			});
		}
		await prisma.customer.update({
			where: {
				id: parseInt(params.id)
			},
			data: {
				shortname,
				logo,
				content
			}
		});

		// console.log('jepure');
		throw redirect(303, `/customer/${params.id}`);
	}
} satisfies Actions;
