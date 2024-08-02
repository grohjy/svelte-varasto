import prisma from '$lib/prisma';

export const load = async () => {
	const response = await prisma.user.findMany({
		orderBy: [
			{
				shortname: 'asc'
			}
		]
	});
	// console.log('looad', response);

	return { users: response };
};

// export const actions = {
// 	default: async ({ request }) => {
// 		const data = await request.formData();
// 		const shortname = data.get('shortname');
// 		let content = data.get('content');
// 		console.log('jepu', data);
// 		return { success: true };
// 	}
// } satisfies Actions;
