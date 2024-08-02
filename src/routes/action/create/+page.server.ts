import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';
// import type { Actions } from './$types';

// import * as fs from 'fs';
// import { writeFileSync } from 'fs';
// export const load = async ({ params ,url}) => {
// 	url.searchParam
// }
export const load = async ({ params, url }) => {
	const taskId = parseInt(url.searchParams.get('task'));
	const task = await prisma.task.findFirst({
		where: { id: taskId },
		include: {
			type: true
		}
	});
	const users = await prisma.user.findMany({});
	const types = await prisma.actionType.findMany({ where: { useInSelection: true } });
	console.log('users', task);

	return { task, users, types };
	// return {};
};

export const actions = {
	default: async ({ request }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));
		// const shortname = data.get('shortname') as string;
		// const logo = data.get('logo') as string;
		// const content = data.get('content') as string;
		// console.log('jepu', data);
		// const files = data.getAll('file') as File[];
		// if (files && files.length > 0) {
		// console.log('fiiles:', files);
		// 	files.forEach(async (file) => {
		// 		const buffer = await file.arrayBuffer();
		// 		const data = Buffer.from(buffer);
		// 		writeFileSync(`static/images/${file.name}.jpg`, data);
		// 	});
		// }
		const qtyTemp = data.get('qty')?.replace(',', '.');

		const qty = parseFloat(qtyTemp);
		await prisma.action.create({
			data: {
				info: data.get('info'),
				qty,
				typeId: parseInt(data.get('type')),
				taskId: parseInt(data.get('task')),
				userId: parseInt(data.get('user'))
			}
		});

		// console.log('jepure');
		throw redirect(303, `/task/${parseInt(data.get('task'))}`);
	}
};
