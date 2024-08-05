import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
// import groupby from 'core-js/actual/array/group-by';

export const load = async ({ params }) => {
	const id = parseInt(params.id);

	const location = await prisma.storageLocation.findFirst({
		where: { id },
		include: {
			inventory: {
				where: {
					active: true
				},
				orderBy: [{ itemId: 'asc' }, { createdAt: 'asc' }],
				include: {
					item: true,
					inventoryRemove: {
						include: { task: true, item: { select: { name: true } } }
					},
					task: true
				}
			}
		}
	});
	const closedInvs = await prisma.storageLocation.findFirst({
		where: { id },
		include: {
			inventory: {
				where: {
					active: false
				},
				orderBy: [{ updatedAt: 'desc' }],
				take: 10,
				include: {
					item: true,
					inventoryRemove: true,
					task: true
				}
			}
		}
	});
	console.log('loc', JSON.stringify(location, null, 2));
	console.log('loc clsoed', closedInvs);

	return { location, closedInvs };

	// const response = await prisma.inventory.findMany({
	// 	where: {
	// 		active: true,
	// 		itemId: id
	// 	},

	// 	orderBy: [{ createdAt: 'asc' }],
	// 	include: {
	// 		location: true,
	// 		task: {
	// 			select: {
	// 				id: true,
	// 				name: true,
	// 				status: true,
	// 				type: true
	// 			}
	// 		},
	// 		item: true,
	// 		inventoryRemove: {
	// 			include: {
	// 				task: true
	// 			}
	// 		}
	// 	}
	// });
	// let j = groupby(response, (inv) => inv.itemId);
	// let j2 = Object.entries(j).map(([key, value]) => {
	// 	return { itemId: key, invs: value };
	// });
	// console.log(Array.isArray(j2), j2.length);
	// j2 = j2.sort((a, b) => a.itemId - b.itemId);
	// console.log('looad', JSON.stringify(j2, null, 1));
	console.log('looad', response);

	return { inventory: response };
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
