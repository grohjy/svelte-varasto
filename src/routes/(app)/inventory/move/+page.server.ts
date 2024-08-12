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
	const invId = parseInt(url.searchParams.get('inv'));
	const storages = await prisma.storageLocation.findMany({});
	const inv = await prisma.inventory.findFirst({
		where: { id: invId },
		include: {
			inventoryRemove: true
		}
	});

	// const tasks = await prisma.task.findMany({
	// 	where: {
	// 		status: {
	// 			NOT: { status: 'done' }
	// 		}
	// 	},
	// 	select: {
	// 		id: true,
	// 		name: true,
	// 		endDate: true,
	// 		status: true,
	// 		type: true,
	// 		item: {
	// 			select: {
	// 				id: true,
	// 				name: true
	// 				// thumb: true
	// 			}
	// 		}
	// 	}
	// });
	// const types = await prisma.actionType.findMany({ where: { useInSelection: true } });
	console.log('users', inv, storages);

	return { inv, storages };
	// return {};
};

export const actions = {
	default: async ({ request }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));

		const inv = await prisma.inventory.findFirst({
			where: { id: parseInt(data.get('inv')) },
			include: {
				inventoryRemove: true
			}
		});
		const qty = inv?.inventoryRemove.reduce((sum, { qty }) => sum - qty, inv.qty);

		console.log('ss', inv, qty);

		const storages = await prisma.storageLocation.findMany({});
		const oldStorage = storages.find((s) => s.id == inv?.locationId);
		const newStorage = storages.find((s) => s.id == parseInt(data.get('storage')));

		// const inventoryId = parseInt(data.get('inv'));
		// const inv = await prisma.inventory.findFirst({
		// 	where: { id: inventoryId }
		// });
		// const qty = parseFloat(data.get('qty'));
		// const qtyLeft = parseFloat(data.get('qtyLeft'));

		const newI = await prisma.inventoryRemove.create({
			data: {
				qty,
				info: `moved to ${newStorage?.rack}/${newStorage?.location}`,
				itemId: inv?.itemId,
				taskId: inv?.taskId,
				inventoryId: inv?.id
			}
		});

		await prisma.inventory.update({
			where: { id: inv?.id },
			data: {
				active: false
			}
		});
		const newI2 = await prisma.inventory.create({
			data: {
				qty,
				info: `moved from ${oldStorage?.rack}/${oldStorage?.location}`,
				itemId: inv?.itemId,
				taskId: inv?.taskId,
				locationId: parseInt(data.get('storage'))
			}
		});

		throw redirect(303, `/item/${inv?.itemId}`);
	}
};
