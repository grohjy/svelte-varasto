import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	const response = await prisma.action.findMany({
		orderBy: [
			{
				createdAt: 'desc'
			}
		],
		where: {
			task: {
				status: {
					NOT: { status: 'done' }
				}
			}
		},
		include: {
			type: true,
			user: true,
			task: {
				include: {
					status: true,
					type: true
				}
			}
		}
	});
	// console.log('looad', response);

	return { actions: response };
	// return {};
}) satisfies PageServerLoad;

// export const actions = {
// 	default: async ({ request }) => {
// 		const data = await request.formData();
// 		const shortname = data.get('shortname');
// 		let content = data.get('content');
// 		console.log('jepu', data);
// 		return { success: true };
// 	}
// } satisfies Actions;
