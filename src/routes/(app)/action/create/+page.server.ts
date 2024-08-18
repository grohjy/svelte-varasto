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
	// console.log('users', task);

	return { task, users, types };
	// return {};
};

export const actions = {
	default: async ({ request, url }) => {
		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));
		let qty = 0;
		if (data.get('qty')) {
			qty = parseFloat(data.get('qty'));
		}

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
		if (url.searchParams.get('href')) throw redirect(303, url.searchParams.get('href'));

		throw redirect(303, `/task/${parseInt(data.get('task'))}`);
	}
};
