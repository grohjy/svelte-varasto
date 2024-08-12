import { getItem, updateParentsAndChilds } from '$lib/gfprisma';
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const item = await getItem(params.id);
	// const item = await updateParentsAndChilds();
	// await req.db.playlist.update({
	// 	data: {
	// 	  labels: {
	// 		deleteMany: {},
	// 	  },
	// 	},
	// 	where: {
	// 	  id: labelId,
	// 	},
	//   })
	// const old = await prisma.itemChildsAndParents.deleteMany({
	// 	where: { parentId: 7 }
	// });
	// console.log('oold', JSON.stringify(old, null, 2));
	// const j = await updateParentsAndChilds();
	// console.log('reessult', JSON.stringify(item, null, 2));
	const nbItems = 1000;
	// const nbItems = item?.childItems?.length;
	// console.log('nbiitems', nbItems);

	return { item };
}) satisfies PageServerLoad;
