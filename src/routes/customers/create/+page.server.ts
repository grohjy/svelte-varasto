import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

// import * as fs from 'fs';
import { writeFileSync } from 'fs';

export const load = (async () => {
	const response = await prisma.customer.findMany({
		where: { parts: { some: {} } },
		include: { parts: true }
	});

	// 2.
	return { data: response };
	// return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		// const kkk = Object.fromEntries(await request.formData());
		console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key));
		const shortname = data.get('shortname') as string;
		const logo = data.get('logo') as string;
		const content = data.get('content') as string;
		console.log('jepu', data);
		const files = data.getAll('file') as File[];
		if (files && files.length > 0) {
			console.log('fiiles:', files);
			files.forEach(async (file) => {
				const buffer = await file.arrayBuffer();
				const data = Buffer.from(buffer);
				writeFileSync(`static/images/${file.name}.jpg`, data);
			});
		}
		await prisma.customer.create({
			data: {
				shortname,
				logo,
				content
			}
		});

		console.log('jepure');
		throw redirect(303, `/customers`);
	}
} satisfies Actions;
