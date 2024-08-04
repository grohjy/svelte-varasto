import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import groupby from 'core-js/actual/array/group-by';

export const load = async () => {
	const response = await prisma.inventory.findMany({
		where: {
			active: true
		},

		orderBy: [{ itemId: 'desc' }, { createdAt: 'asc' }],
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
	let j = groupby(response, (inv) => inv.itemId);
	let j2 = Object.entries(j).map(([key, value]) => {
		return { itemId: key, invs: value };
	});
	// console.log(Array.isArray(j2), j2.length);
	// j2 = j2.sort((a, b) => a.itemId - b.itemId);
	// console.log('looad', JSON.stringify(j2, null, 1));

	return { inventory: j2 };
};

export const actions = {
	remove: async ({ request }) => {
		const data = await request.formData();
		data.forEach((value, key) => console.log('key:', key, value));
		// return { success: true };
		const inventoryId = parseInt(data.get('inventory'));
		const inv = await prisma.inventory.findFirst({
			where: { id: inventoryId }
		});
		await prisma.inventoryRemove.create({
			data: {
				qty: parseInt(data.get('qty')),
				inventoryId: inv?.id,
				itemId: inv?.itemId
			}
		});

		// console.log('jepure');
		throw redirect(303, `/inventory`);
	}
};
