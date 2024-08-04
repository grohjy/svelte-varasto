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
	const inv = await prisma.inventory.findMany({
		where: { itemId, active: true },
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
			item: true,
			inventoryRemove: {
				include: {
					task: true
				}
			}
		}
	});
	const tasks = await prisma.task.findMany({
		where: {
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
	console.log('users', tasks);

	return { inv, tasks };
	// return {};
};

export const actions = {
	default: async ({ request }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));
		const inventoryId = parseInt(data.get('inv'));
		const inv = await prisma.inventory.findFirst({
			where: { id: inventoryId }
		});
		const qty = parseFloat(data.get('qty'));
		const qtyLeft = parseFloat(data.get('qtyLeft'));

		const newI = await prisma.inventoryRemove.create({
			data: {
				qty,
				info: data.get('info'),
				itemId: inv?.itemId,
				taskId: parseInt(data.get('task')),
				inventoryId
			}
		});
		if (qty - qtyLeft == 0) {
			console.log('qleft');
			await prisma.inventory.update({
				where: { id: newI.inventoryId },
				data: {
					active: false
				}
			});
		}
		// console.log('jepure');
		throw redirect(303, `/inventory`);
	}
};
