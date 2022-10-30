export default async (_, args, { setCookie }) => {
	setCookie('auth-jwt', '', {
		expires: 0,
		path: '/',
		httpOnly: true,
		sameSite: 'none',
		secure: true
	});
	setCookie('session', '', {
		expires: 0,
		httpOnly: true,
		path: '/',
		sameSite: 'none',
		secure: true
	});
	return true;
};
