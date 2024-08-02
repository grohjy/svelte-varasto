import prisma from '$lib/prisma';

export const load = async ({ params }) => {
	const response = await prisma.user.findFirst({
		where: { id: parseInt(params.id) },

		include: {
			actions: {
				orderBy: { createdAt: 'desc' },
				take: 20,
				include: {
					type: true,
					task: {
						include: {
							type: true,
							item: true
						}
					}
				}
			}
		}
	});
	// console.log('use', JSON.stringify(response, null, 2));

	return { user: response };
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
