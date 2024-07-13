import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async ({ params }) => {
	// console.log('paraa', params.id);
	//  params.id
	let id = 0;
	id = params.id;
	const response = await prisma.customer.findFirst({
		where: { id: parseInt(params.id) }
	});
	// console.log('looad', response);

	// 2.
	return { customer: response };
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
