import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	const response = await prisma.customer.findMany({
		orderBy: [
			{
				shortname: 'asc'
			}
		],
		where: { active: true }
		// where: { parts: { some: {} } },
		// include: { parts: true }
	});
	// console.log('looad', response);

	// 2.
	return { customers: response };
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
