import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

function reduceArray(arr, removeArr) {
	const diff = arr.filter((newItem) => {
		return !removeArr.find(
			(removeItem) =>
				removeItem.childId == newItem.childId || removeItem.parentId == newItem.childId
		);
	});
	return diff;
}

export const load = async ({ url }) => {
	// console.log('aaaaa');

	const itemId = url.searchParams.get('parent');
	const taskId = url.searchParams.get('task');
	let selectableItems;

	selectableItems = await prisma.item.findMany({
		where: {
			active: true,
			...(itemId ? { NOT: { id: parseInt(itemId) } } : {}),
			type: { type: 'product' }
		},
		select: {
			id: true,
			name: true,
			type: true,
			childItems: true
		}
	});
	console.log('ssss', selectableItems);
	// console.log('ssss', JSON.stringify(selectableItems,null,2));

	return { selectableItems };
};

export const actions = {
	default: async ({ request, params, url }) => {
		let parentId = url.searchParams.get('parent');
		let taskId = url.searchParams.get('task');
		const data = await request.formData();
		let itemId = data.get('item');
		// data.forEach((value, key) => console.log('itemkey:', key, value));

		if (itemId && parentId) {
			parentId = parseInt(parentId);
			itemId = parseInt(itemId);
			const existingChildren = await prisma.itemChildsAndParents.findMany({
				where: { parentId }
			});

			const newChildren = await prisma.itemChildsAndParents.findMany({
				where: { parentId: itemId },
				omit: { parentId: true }
			});

			const uniqueNew = reduceArray(newChildren, existingChildren);
			// console.log('redd', uniqueNew);

			const response = await prisma.item.update({
				where: { id: parentId },
				data: {
					childItems: { create: uniqueNew }
				}
			});
			// console.log('seed response', response);
			throw redirect(303, `/item/${parentId}`);
		}
		if (itemId && taskId) {
			taskId = parseInt(taskId);
			itemId = parseInt(itemId);
			const existingChildren = await prisma.taskAndChildItems.findMany({
				where: { parentId: taskId }
			});

			const newChildren = await prisma.itemChildsAndParents.findMany({
				where: { parentId: itemId },
				omit: { parentId: true }
			});

			const uniqueNew = reduceArray(newChildren, existingChildren);
			// console.log('redd', uniqueNew);

			const response = await prisma.task.update({
				where: { id: taskId },
				data: {
					childItems: { create: uniqueNew }
				}
			});
			// console.log('seed response', JSON.stringify(response, null, 2));
			throw redirect(303, `/task/${taskId}`);
		}
		throw redirect(303, `/`);
	}
};
