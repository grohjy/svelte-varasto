import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import { formatType, getItem } from '$lib/gfprisma';
import { writeFileSync } from 'fs';
import { parseDate } from '@internationalized/date';
import { writePath } from '$lib/gfhelpers.js';
// import { writeFileSync } from 'fs';

export const load = async ({ params }) => {
	const id = parseInt(params.id);
	const response = await prisma.task.findFirst({
		where: { id },
		include: {
			item: {
				select: {
					name: true
				}
			},
			type: true,
			status: true,
			childItems: {
				include: {
					child: { include: { type: true } }
				}
			}
		}
	});

	const selectableStatus = await prisma.taskStatus.findMany({
		select: {
			id: true,
			status: true
		}
	});

	const selectableTypesTemp = await prisma.taskType.findMany({
		where: { useInSelection: true },
		select: {
			id: true,
			type: true,
			subtype: true
		}
	});
	const selectableTypes = selectableTypesTemp.map((type) => {
		return { id: type.id, type: formatType(type.type, type.subtype) };
	});
	const selectableItems = await prisma.item.findMany({
		where: { active: true },
		select: {
			id: true,
			name: true,
			type: true
		}
	});

	return { task: response, selectableTypes, selectableStatus, selectableItems };
};

export const actions = {
	default: async ({ request, params, url }) => {
		const data = await request.formData();

		const content = data.get('content') as string;
		const files = data.getAll('file') as File[];
		if (files && files.length > 0) {
			files.forEach(async (file) => {
				const buffer = await file.arrayBuffer();
				const data = Buffer.from(buffer);
				writeFileSync(`${writePath()}img/${file.name}.jpg`, data);
			});
		}
		let c = JSON.parse(data.get('children'));
		c = c.map((item) => {
			return {
				childId: parseInt(item.id),
				itemCount: parseInt(item.itemCount),
				unitsCount: parseInt(item.unitsCount),
				unit: item.unit
			};
		});
		// console.log('childitemm', c);

		const result = await prisma.task.update({
			where: {
				id: parseInt(params.id)
			},

			data: {
				name: data.get('name'),
				typeId: parseInt(data.get('type')),
				statusId: parseInt(data.get('status')),
				startDate: new Date(data.get('startDate')).toISOString(),
				endDate: new Date(data.get('endDate')).toISOString(),
				qty: parseFloat(data.get('qty')),
				// startDate: Date.parse(data.get('startDate')),
				// endDate: Date.parse(data.get('endDate')),
				content,
				// thumb: data.get('thumb'),
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
				item: {
					select: {
						name: true
					}
				},
				type: true,
				status: true
			}
		});
		// console.log('reestask', result);
		// console.log('reestask url', url);
		if (url.searchParams.get('item')) throw redirect(303, `/item/${url.searchParams.get('item')}`);
		if (url.searchParams.get('href')) throw redirect(303, url.searchParams.get('href'));
		throw redirect(303, `/task/${params.id}`);
	}
};
