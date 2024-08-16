import prisma from '$lib/prisma';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

export const load = async ({ url }) => {
	dayjs.extend(isoWeek);
	const nbWeeks = parseInt(url.searchParams.get('w') ?? 4);
	const nbWeeksBefore = parseInt(url.searchParams.get('wb') ?? 3);
	const firstDay = dayjs().add(-nbWeeksBefore, 'w').startOf('isoWeek').toDate();
	const lastDay = dayjs().add(nbWeeks, 'w').startOf('isoWeek').toDate();
	console.log('weeks', firstDay.toLocaleDateString('fi'), lastDay.toLocaleDateString('fi'));
	console.log('weeks', nbWeeks, nbWeeksBefore);

	const items = await prisma.item.findMany({
		where: {
			type: {
				type: 'product'
			},
			active: true
		},
		omit: {
			// thumb: true,
			content: true
		},
		include: {
			parentItems: {
				include: {
					parent: {
						omit: { thumb: true, content: true },
						include: { type: { where: { OR: [{ type: 'product' }, { subtype: 'customer' }] } } }
					}
				}
			},
			tasks: {
				omit: { content: true },
				where: {
					AND: [
						{ startDate: { lte: lastDay } },
						{ endDate: { gte: firstDay } },
						{ NOT: { status: { status: 'done' } } }
					]
				},
				include: { type: true, status: true }
			}
		}
	});
	// console.log('sale ite', JSON.stringify(items, null, 2));

	return { items, nbWeeksBefore, nbWeeks };
};
