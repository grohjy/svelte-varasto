import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

// import * as fs from 'fs';
// import { writeFileSync } from 'fs';

export const load = (async () => {
	// 	const response = await prisma.customer.findMany({
	// 		where: { parts: { some: {} } },
	// 		include: { parts: true }
	// 	});

	// 2.
	// return { data: response };
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url }) => {
		const parentId = parseInt(url.searchParams.get('parent'));
		const newItem = await prisma.item.create({
			data: {
				parentItems: parentId
					? {
							create: {
								parentId,
								itemCount: 1,
								unitsCount: 0,
								unit: 'pcs'
							}
						}
					: {}
			}
		});

		console.log('jepure', newItem);
		throw redirect(303, `/item/${newItem.id}/edit`);
	}
} satisfies Actions;
