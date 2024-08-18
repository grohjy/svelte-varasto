import prisma from '$lib/prisma';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import groupby from 'core-js/actual/array/group-by';

export const load = async ({ url }) => {
	dayjs.extend(isoWeek);
	const nbWeeks = parseInt(url.searchParams.get('w') ?? 3);
	const nbWeeksBefore = parseInt(url.searchParams.get('wb') ?? 1);
	const firstDay = dayjs().add(-nbWeeksBefore, 'w').startOf('isoWeek').toDate();
	const lastDay = dayjs().add(nbWeeks, 'w').startOf('isoWeek').toDate();
	// console.log('weeks', firstDay.toLocaleDateString('fi'), lastDay.toLocaleDateString('fi'));
	// console.log('weeks', nbWeeks, nbWeeksBefore);

	const tasks = await prisma.task.findMany({
		where: {
			// AND: [
			type: { OR: [{ type: 'factory' }, { type: 'inj_molding' }] },
			startDate: { lte: lastDay },
			endDate: { gte: firstDay },
			NOT: { status: { status: 'done' } }
			// ]
		},
		orderBy: [{ type: { type: 'desc' } }, { type: { subtype: 'asc' } }],
		omit: {
			content: true
		},
		include: {
			item: {
				omit: { content: true }
			},
			status: true,
			type: true
		}
	});

	const tasksByType = groupby(tasks, ({ type }) => type.subtype);
	const tasksByType2 = Object.entries(tasksByType).map(([key, value]) => {
		return { type: key, tasks: value };
	});

	// console.log('sale ite', JSON.stringify(tasksByType2, null, 2));
	// console.log('loppuu');

	return { tasksByType2, nbWeeksBefore, nbWeeks };
};
