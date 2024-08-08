import prisma from '$lib/prisma';
type RelatedItem = {
	id: number;
	itemCount: number;
	unitsCount: number;
	unit: string;
	name: string;
	type: string;
};
type Item = {
	id: number;
	name: string;
	typeId: number;
	type: string; // type/subtype ie. "plastic/PA"
	parentItemsCount?: number;
	parentItems?: RelatedItem[];
	childItems?: RelatedItem[];
};
// function formatType(type: string | undefined | null, subtype: string | undefined | null) {
export function formatType(type: string | null = '-', subtype: string | null = '-') {
	if (type === null) type = '-';
	if (subtype === null) subtype = '-';
	return `${type}/${subtype}`;
}
function formatRelatedItems<T>(data: T, fieldName: string): RelatedItem[] {
	const items: RelatedItem[] = [];
	// console.log('daat', JSON.stringify(data, null, 2));

	// console.log('iitem', data);
	if (Array.isArray(data)) {
		data.forEach((item) => {
			const newItem: RelatedItem = {
				id: item[fieldName].id,
				name: item[fieldName].name,
				thumb: item[fieldName].thumb,
				itemCount: item.itemCount,
				unitsCount: item.unitsCount,
				unit: item.unit,
				type: formatType(item[fieldName].type?.type, item[fieldName].type?.subtype)
			};
			items.push(newItem);
		});

		// return items;
	}
	return items;
}

export async function getItem(id: string | number) {
	// id = 6;
	const parentCount = await prisma.itemChildsAndParents.count({
		where: { childId: +id }
	});
	// console.log('paare', parentCount);
	const optionalParentItems =
		parentCount < 11 ? { parentItems: { include: { parent: { include: { type: true } } } } } : {};

	const item = await prisma.item.findFirst({
		where: {
			id: +id
		},
		include: {
			type: true,
			// customer: { select: { shortname: true } },
			childItems: {
				include: {
					child: { include: { type: true } }
				}
			},
			...optionalParentItems,
			tasks: {
				include: {
					type: true,
					status: true
				}
			},
			inventory: {
				where: { active: true },
				include: {
					task: true,
					location: true,
					inventoryRemove: {
						include: {
							task: {
								include: {
									item: {
										select: {
											name: true
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
	const closedInv = await prisma.inventory.findMany({
		where: {
			itemId: +id,
			active: false
		},
		orderBy: { updatedAt: 'desc' },
		take: 4,
		include: {
			task: true,
			location: true,
			inventoryRemove: {
				include: {
					task: {
						include: {
							item: { select: { name: true } }
						}
					}
				}
			}
		}
	});
	const storages = await prisma.storageLocation.findMany({});

	// console.log('iiteee', item);

	let fItem: Item | undefined;
	if (item) {
		const childItems = item.childItems;
		const parentItems = item.parentItems;
		fItem = {
			id: item.id,
			name: item.name,
			thumb: item.thumb,
			typeId: item.typeId,
			type: formatType(item.type?.type, item.type?.subtype),
			content: item.content,
			parentItemsCount: parentCount,
			parentItems: formatRelatedItems<typeof parentItems>(parentItems, 'parent'),
			childItems: formatRelatedItems<typeof childItems>(childItems, 'child'),
			tasks: item.tasks,
			inventory: item.inventory,
			closedInv,
			storages
		};
	}

	// console.log('aee', JSON.stringify(fItem.inventory, null, 2));
	// console.log('aee', JSON.stringify(fItem.inventoryRemove, null, 2));
	return fItem;
}

export async function updateParentsAndChilds() {
	const child = [
		{
			unitsCount: 3,
			unit: 'jg',
			childId: 8
		},
		{
			unitsCount: 3,
			unit: 'jg',
			childId: 6
		}
	];
	const result = await prisma.item.update({
		where: {
			id: 7
		},

		data: {
			childItems: {
				deleteMany: {},

				//change parentId to this items id ie. move child to current item's child
				connect: {
					parentId_childId: { childId: 10, parentId: 1 }
				}
			}
			// childItems: { //unconnect all childs and connect selected childs
			// 	deleteMany: {},
			// 	create: child
			// },
			// parentItems: { //unconnect every item this item is parent to and connect this as parent to selected items
			// 	deleteMany: {},
			// 	create: [{ unitsCount: 3, unit: 'jg', parentId: 3 }]
			// }
		},
		include: {
			childItems: true
		}
	});
	console.log('res', result);

	return result;
}
