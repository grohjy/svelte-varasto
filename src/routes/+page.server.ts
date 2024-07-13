import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	const response = await prisma.customer.findMany({
		where: { parts: { some: {} } },
		include: { parts: true }
	});

	// 2.
	return { data: response };
	// return {};
}) satisfies PageServerLoad;

export const actions = {
	image: async ({ request }) => {
		const data = await request.formData();

		console.log('jepu', data);
		return { success: true };
	}
} satisfies Actions;
