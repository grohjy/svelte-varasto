import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { formatType, getItem } from '$lib/gfprisma';
import { writeFileSync } from 'fs';
import { writePath } from '$lib/gfhelpers';
// import { writeFileSync } from 'fs';

export const load = (async ({ params }) => {
	// console.log('paraa', params.id);
	const item = await getItem(params.id);
	let selectableItemsTemp = await prisma.item.findMany({
		where: { active: true },
		select: {
			id: true,
			name: true,
			type: true
		}
	});
	const selectableItems = selectableItemsTemp.map((item) => {
		// let t = formatType(item.type?.type, item.type?.subtype);

		return { ...item, type: formatType(item.type?.type, item.type?.subtype) };
	});
	// console.log('itteems', selectableItems);

	let selectableTypesTemp = await prisma.typeItem.findMany({
		where: { useInSelection: true },
		select: {
			id: true,
			type: true,
			subtype: true
		}
	});
	const selectableTypes = selectableTypesTemp.map((type) => {
		// let t = formatType(item.type?.type, item.type?.subtype);

		return { id: type.id, type: formatType(type.type, type.subtype) };
	});
	// console.log('typpes', selectableTypes);
	return { item, selectableItems, selectableTypes };
	// return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		// const kkk = Object.fromEntries(await request.formData());
		// console.log('kkk');

		const data = await request.formData();
		// data.forEach((value, key) => console.log('itemkey:', key, value));

		let c = JSON.parse(data.get('children'));
		c = c.map((item) => {
			return {
				childId: parseInt(item.id),
				itemCount: parseInt(item.itemCount),
				unitsCount: parseInt(item.unitsCount),
				unit: item.unit
			};
		});
		// let p = JSON.parse(data.get('parents'));
		// p = p.map((item) => {
		// 	return {
		// 		parentId: parseInt(item.id),
		// 		// unitsCount: 0
		// 		itemCount: parseInt(item.itemCount),
		// 		unitsCount: parseInt(item.unitsCount),
		// 		unit: item.unit
		// 	};
		// });

		const content = data.get('content') as string;
		const files = data.getAll('file') as File[];
		// console.log('fiile1');
		if (files && files.length > 0) {
			files.forEach(async (file) => {
				const buffer = await file.arrayBuffer();
				const data = Buffer.from(buffer);
				writeFileSync(`${writePath()}img/${file.name}.jpg`, data);

				// writeFileSync(`/app/build/client/images/${file.name}.jpg`, data);
				// writeFileSync(`data/static/images/${file.name}.jpg`, data);
			});
		}
		// console.log('fiile2');

		const result = await prisma.item.update({
			where: {
				id: parseInt(params.id)
			},

			data: {
				name: data.get('name'),
				typeId: parseInt(data.get('type')),
				content,
				thumb: data.get('thumb'),
				recipeDefQty: parseInt(data.get('defQty')),
				childItems: {
					deleteMany: {},
					create: c
				}
				// parentItems: {
				// 	deleteMany: {},
				// 	create: p
				// }
			},
			include: {
				childItems: true,
				parentItems: true
			}
		});
		// console.log('rees', result);

		// console.log('parents', JSON.stringify(data.getAll('parents')));
		const customerId = data.get('customer2') as string;
		throw redirect(303, `/item/${params.id}`);
	}
} satisfies Actions;
