import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const response = await prisma.user.update({
	where: { shortname: 'mko' },
	data: {
		hashedPassword: await bcrypt.hash('koe', 10)
	}
});

const response2 = await prisma.user.findMany({});

console.log('seed response', response2);
