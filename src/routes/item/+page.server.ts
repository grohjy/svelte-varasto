import prisma from '$lib/prisma';
import { search } from '$lib/stores.svelte';

export const load = async () => {
	const items = await prisma.item.findMany({
		where: {
			active: true
			// type: {
			// 	OR: [{ type: 'plastic' }, { type: 'product' }]
			// }
		},
		select: {
			id: true,
			name: true,
			thumb: true,
			type: true,
			parentItems: {
				orderBy: { parent: { updatedAt: 'asc' } },
				take: 1,
				include: {
					parent: {
						select: { id: true, name: true, type: true }
					}
				}
			}
		}
	});
	// console.log('chiild', items);

	return { items };
};
