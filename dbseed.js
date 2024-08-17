import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function reduceArray(arr, removeArr) {
	let diff = arr.filter((newItem) => {
		return !removeArr.find(
			(removeItem) =>
				removeItem.childId == newItem.childId || removeItem.parentId == newItem.childId
		);
	});
	return diff;
}

const existing = await prisma.itemChildsAndParents.findMany({
	where: { parentId: 42 }
});

const newI = [{ childId: 18 }, { childId: 15 }, { childId: 42 }];

const a = reduceArray(newI, existing);
console.log('redd', a);

// const response = await prisma.item.update({
// 	where: { id: 42 },
// 	data: {
// 		childItems: { create: a }
// 	},
// 	include:{
// 		childItems:true
// 	}
// });
// console.log('seed response', response);

// const response2 = await prisma.itemChildsAndParents.findMany({ where: { parentId: 42 } });

// console.log('seed response2', response2);

// const response = await prisma.user.update({
// 	where: { shortname: 'mko' },
// 	data: {
// 		hashedPassword: await bcrypt.hash('koe', 10)
// 	}
// });

// const response2 = await prisma.user.findMany({});
