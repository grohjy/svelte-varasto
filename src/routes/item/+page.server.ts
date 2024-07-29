import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const items = await prisma.item.findMany({
		where: {
			type: {
				OR: [{ type: 'plastic' }, { type: 'product' }]
			}
		},
		include: {
			type: true,
			childItems: {
				include: {
					child: { include: { type: { select: { type: true, subtype: true } } } }
				}
			}
			// parentItems: {
			// 	include: {
			// 		parent: true
			// 	}
			// }
		}
	});
	// console.log('childp', JSON.stringify(item, null, 2));
	items.forEach((item) => {
		item.subtype = item.type?.subtype;
		item.type = item.type?.type;
		const childs: {}[] = [];
		item?.childItems.forEach((i) => {
			const id = i.childId;
			const name = i.child.name;
			const type = i.child.type?.type;
			const subtype = i.child.type?.subtype;
			const unitsCount = i.unitsCount;
			const itemCount = i.itemCount;
			const unit = i.unit;
			childs.push({ id, name, type, subtype, itemCount, unitsCount, unit });
		});
		item.childItems = childs;
		// console.log('chiild', item);
	});

	return { items };
}) satisfies PageServerLoad;
