import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tasks = await prisma.task.findMany({
		where: {
			status: {
				NOT: { status: 'done' }
			}
		},
		orderBy: {
			endDate: 'asc'
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
					name: true,
					thumb: true
				}
			}
		}
	});
	// console.log('taasks', tasks);

	return { tasks };
}) satisfies PageServerLoad;
