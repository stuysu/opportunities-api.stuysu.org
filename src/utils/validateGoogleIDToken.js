import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_LOGIN_CLIENT_ID } from '../constants';

const client = new OAuth2Client(GOOGLE_LOGIN_CLIENT_ID);

const validateGoogleIdToken = async (idToken) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: idToken,
			audience: GOOGLE_LOGIN_CLIENT_ID,
		});
		return (ticket.getPayload());
	} catch (e) {
		return null;
	}
};

export default validateGoogleIdToken;
