import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tasks = await prisma.task.findMany({
		where: {
			status: {
				NOT: { status: 'done' }
			}
		},
		include: {
			// item: true,
			status: true,
			type: true
		}
	});

	return { tasks };
}) satisfies PageServerLoad;
