import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import groupby from 'core-js/actual/array/group-by';

export const load = async () => {
	const response = await prisma.storageLocation.findMany({
		// where: {
		// 	active: true
		// },

		orderBy: [{ rack: 'asc' }, { location: 'asc' }],
		include: {
			inventory: {
				where: {
					active: true
				},
				orderBy: [{ itemId: 'asc' }, { updatedAt: 'asc' }],
				include: {
					item: true,
					inventoryRemove: true
				}
			}
		}
	});
	return { location: response };
};

// export const actions = {
// 	remove: async ({ request }) => {
// 		const data = await request.formData();
// 		data.forEach((value, key) => console.log('key:', key, value));
// 		// return { success: true };
// 		const inventoryId = parseInt(data.get('inventory'));
// 		const inv = await prisma.inventory.findFirst({
// 			where: { id: inventoryId }
// 		});
// 		await prisma.inventoryRemove.create({
// 			data: {
// 				qty: parseInt(data.get('qty')),
// 				inventoryId: inv?.id,
// 				itemId: inv?.itemId
// 			}
// 		});

// 		// console.log('jepure');
// 		throw redirect(303, `/inventory`);
// 	}
// };
