import { AuthenticationError } from "../../index.js";

import validateGoogleIDToken from "../../../utils/validateGoogleIDToken.js";

import { sign } from "jsonwebtoken";

import { PRIVATE_KEY, WHITELISTED_EMAIL_DOMAINS } from "../../../constants.js";

import db from "../../../database/index.js";
const { users, oAuthIds } = db;  // Deno fixes

const loginWithGoogle = async (_, { googleOAuthToken }, { setCookie }) => {
	const payload = await validateGoogleIDToken(googleOAuthToken);

	if (!payload) {
		throw new AuthenticationError("Invalid Google ID token.");
	}

	if (!payload.email_verified) {
		throw new AuthenticationError("Email address with the Google ID token is not verified.");
	}

	const oAuthId = await oAuthIds.findOne({
		where: {
			platformId: payload.sub,
			platform: "google"
		},
		include: users
	});

	let user = oAuthId ? oAuthId.user : null;

	if (!user) {
		user = await users.findOne({
			where: {
				email: payload.email
			}
		});
		if (user) {
			// update oauthids
			await oAuthIds.create({
				userId: user.id,
				platform: "google",
				platformId: payload.sub,
				platformEmail: payload.email
			});
		}
	}

	if (!user) {
		const isInSchool = WHITELISTED_EMAIL_DOMAINS.includes(payload.hd);
		if (!isInSchool) {
			throw new AuthenticationError("Email not associated with an account");
		}
		// if is in school, make new account
		user = await users.create({
			firstName: payload.given_name,
			lastName: payload.family_name,
			email: payload.email,
			isFaculty: false,
			active: true
		});
	}

	const id = user.id;
	const firstName = user.firstName;
	const lastName = user.lastName;
	const email = user.email;

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
		{ algorithm: "ES512", expiresIn: "30d" }
	);

	//console.log(verify(token, PUBLIC_KEY, {algorithms: ["RS512"]}));

	setCookie("auth-jwt", token, {
		maxAge: 1000 * 60 * 60 * 24 * 30,
		path: "/",
		httpOnly: true,
		sameSite: "none",
		secure: true
	});

	return token;
};

export default loginWithGoogle;
