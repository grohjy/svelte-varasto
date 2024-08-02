// import { getItem, updateParentsAndChilds } from '$lib/gfprisma';
import prisma from '$lib/prisma';
// import type { PageServerLoad } from './$types';

export const load = async ({ params }) => {
	const id = parseInt(params.id);

	const response = await prisma.task.findFirst({
		where: { id },
		include: {
			item: {
				select: {
					name: true,
					thumb: true
				}
			},
			type: true,
			status: true,
			actions: {
				include: {
					type: true,
					user: true
				}
			}
		}
	});
	// console.log('task', response);

	return { task: response };
};
// }) satisfies PageServerLoad;
