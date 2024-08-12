import prisma from '$lib/prisma';

export const handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		if (event.url.pathname == '/login') {
			return await resolve(event);
		}
		return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
	}
	if (event.url.pathname == '/login' && event.url.search != '?/logout') {
		return new Response('Redirect', { status: 303, headers: { Location: '/' } });
	}

	// find the user based on the session
	const user = await prisma.user.findUnique({
		where: { id: parseInt(session) },
		omit: {
			hashedPassword: true
		}
	});

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
