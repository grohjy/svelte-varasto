// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// .$extends({
// 	result: {
// 		typeItem: {
// 			typejg: {
// 				needs: { type: true, subtype: true },
// 				compute(item) {
// 					return `${item.type}/${item.subtype}`;
// 				}
// 			}
// 		}
// 	}
// });
export default prisma;
