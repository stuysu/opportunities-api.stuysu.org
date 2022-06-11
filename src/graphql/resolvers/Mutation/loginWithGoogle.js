import { AuthenticationError } from "apollo-server-core";

import validateGoogleIDToken from "../../../utils/validateGoogleIDToken";

import {sign} from 'jsonwebtoken';

import {PRIVATE_KEY } from "../../../constants";

const loginWithGoogle = async (_, {googleOAuthToken}, {setCookie}) => {
	const payload = await validateGoogleIDToken(googleOAuthToken);
	
	if(!payload){
		throw new AuthenticationError("Invalid Google ID token.");
	}
	
	if(!payload.email_verified){
		throw new AuthenticationError("Email address with the Google ID token is not verified.");
	}
	
	const id = "test";
	const firstName = payload.given_name;
	const lastName = payload.family_name;
	const email = payload.email;
	
	const token = await sign(
		{
			user: {
				id,
				firstName,
				lastName,
				email
			}
		},
		{ key: PRIVATE_KEY },
		{ algorithm: "RS512", expiresIn: "30d"}
	);
	
	//console.log(verify(token, PUBLIC_KEY, {algorithms: ["RS512"]}));
	
	setCookie('auth-jwt', token, {
		maxAge: 1000 * 60 * 60 * 24 * 30,
		path: '/',
		httpOnly: true,
		sameSite: 'none',
		secure: true
	});
	
	return token;
};

export default loginWithGoogle;
