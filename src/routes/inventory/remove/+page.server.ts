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
	const itemId = parseInt(url.searchParams.get('item'));
	const taskId = parseInt(url.searchParams.get('task'));
	const where = { active: true, ...(itemId ? { itemId } : {}) };
	// console.log('wheere', where);

	const inv = await prisma.inventory.findMany({
		where,
		orderBy: [{ createdAt: 'asc' }],
		include: {
			location: true,
			task: {
				select: {
					id: true,
					name: true,
					status: true,
					type: true
				}
			},
			item: { select: { name: true } },
			inventoryRemove: {
				include: {
					task: true
				}
			}
		}
	});

	const taskWhere = taskId ? { id: taskId } : {};

	const tasks = await prisma.task.findMany({
		where: {
			...taskWhere,
			status: {
				NOT: { status: 'done' }
			}
		},
		select: {
			id: true,
			name: true,
			endDate: true,
			status: true,
			type: true,
			item: {
				select: {
					id: true,
					name: true
					// thumb: true
				}
			}
		}
	});
	// const types = await prisma.actionType.findMany({ where: { useInSelection: true } });
	console.log('inv', inv.length);
	console.log('tass', tasks.length);

	return { inv, tasks, itemId, taskId };
	// return {};
};

export const actions = {
	default: async ({ request, url }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));
		const inventoryId = parseInt(data.get('location'));
		const inv = await prisma.inventory.findFirst({
			where: { id: inventoryId },
			include: {
				inventoryRemove: true
			}
		});
		const qty = parseFloat(data.get('qty'));
		const qtyLeft = inv?.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty);

		const newI = await prisma.inventoryRemove.create({
			data: {
				qty,
				info: data.get('info'),
				itemId: inv?.itemId,
				taskId: parseInt(data.get('task')),
				inventoryId
			}
		});
		await prisma.inventory.update({
			where: { id: inventoryId },
			data: {
				active: qtyLeft != qty
			}
		});
		const t = parseInt(url.searchParams.get('task'));
		const redirecUrl = t ? `/task/${t}` : `/inventory`;
		throw redirect(303, redirecUrl);
	}
};
