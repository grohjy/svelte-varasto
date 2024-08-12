import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const load = async () => {
	// const response = await prisma.action.findMany({
	// 	orderBy: [
	// 		{
	// 			createdAt: 'desc'
	// 		}
	// 	],
	// 	where: {
	// 		task: {
	// 			status: {
	// 				NOT: { status: 'done' }
	// 			}
	// 		}
	// 	},
	// 	include: {
	// 		type: true,
	// 		user: true,
	// 		task: {
	// 			include: {
	// 				status: true,
	// 				type: true
	// 			}
	// 		}
	// 	}
	// });
	// console.log('looad', response);

	// return { actions: response };
	return {};
};

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		// data.forEach((value, key) => console.log('itemkey:', key, value));
		const shortname = data.get('shortname') as string;

		const password = data.get('password');

		const user = await prisma.user.findUnique({
			where: { shortname: shortname.trim().toLocaleLowerCase() }
		});
		if (!user) {
			return fail(400, { credentials: true });
		}
		// console.log('useer', user);

		const userPassword = await bcrypt.compare(password, user.hashedPassword);
		if (!userPassword) {
			return fail(400, { credentials: true });
		}

		cookies.set('session', user.id, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after 16h
			// maxAge: 10
			// expires: t

			maxAge: 60 * 60 * 16
		});

		// redirect the user
		redirect(302, '/');

		// return { success: true };
	},
	logout: async ({ cookies }) => {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		redirect(302, '/login');
	}
};
