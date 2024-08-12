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
	// const itemId = parseInt(url.searchParams.get('item'));
	const taskId = parseInt(url.searchParams.get('task'));
	let where = {
		status: {
			NOT: { status: 'done' }
		}
	};
	if (taskId) {
		where = { id: taskId };
	}
	const tasks = await prisma.task.findMany({
		where,
		include: {
			type: true,
			item: { select: { name: true } }
		}
	});
	const storages = await prisma.storageLocation.findMany({});

	// const types = await prisma.actionType.findMany({ where: { useInSelection: true } });
	console.log('users', tasks);

	// return { task, users, types };
	return { storages, tasks };
};

export const actions = {
	default: async ({ request, url }) => {
		const taskUrl = url.searchParams.get('task');
		const redirUrl = taskUrl ? `/task/${taskUrl}` : '/inventory';
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));

		const task = await prisma.task.findFirst({
			where: {
				id: parseInt(data.get('task'))
			}
		});
		const newI = await prisma.inventory.create({
			data: {
				qty: parseFloat(data.get('qty')),
				info: data.get('info'),
				itemId: task?.itemId,
				taskId: task.id,
				locationId: parseInt(data.get('location'))
			}
		});
		throw redirect(303, redirUrl);
	}
};
