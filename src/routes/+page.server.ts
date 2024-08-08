import prisma from '$lib/prisma';
import { search } from '$lib/stores.svelte';

export const load = async () => {
	const items = await prisma.item.findMany({
		orderBy: { updatedAt: 'desc' },
		take: 5,
		select: {
			id: true,
			name: true,
			thumb: true,
			updatedAt: true,
			type: true,
			parentItems: {
				orderBy: { parent: { updatedAt: 'desc' } },
				take: 1,
				include: {
					parent: {
						select: { id: true, name: true, type: true }
					}
				}
			}
		}
	});
	const tasks = await prisma.task.findMany({
		orderBy: { updatedAt: 'desc' },
		take: 10,
		select: {
			id: true,
			name: true,
			updatedAt: true,
			type: true,
			status: true,
			item: { select: { id: true, name: true, thumb: true, type: true } }
		}
	});
	const actions = await prisma.action.findMany({
		orderBy: { createdAt: 'desc' },
		take: 20,
		select: {
			id: true,
			info: true,
			qty: true,
			createdAt: true,
			type: true,
			user: true,
			task: {
				select: {
					id: true,
					name: true,
					type: true,
					item: {
						select: { id: true, name: true, thumb: true }
					}
				}
			}
		}
	});
	// console.log('ssss', JSON.stringify(actions, null, 2));
	return { items, tasks, actions };
};
