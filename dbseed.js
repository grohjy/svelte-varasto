import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const response = await prisma.user.create({
	data: {
		shortname: 'mko',
		firstname: 'Mika',
		lastname: 'Könönen'
	}
});

const response2 = await prisma.user.findMany({});

console.log('seed response', response2);
