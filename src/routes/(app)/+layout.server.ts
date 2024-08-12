// import prisma from '$lib/prisma';
// import type { PageServerLoad } from './$types';
// import type { Actions } from './$types';

export const load = async ({ locals }) => {
	// const response = await prisma.customer.findMany({
	// 	where: { parts: { some: {} } },
	// 	include: { parts: true }
	// });

	// 2.
	// return { data: response };
	return { user: locals.user };
};
