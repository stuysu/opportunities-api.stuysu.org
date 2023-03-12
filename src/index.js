import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { apolloServer, ForbiddenError } from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { verify } from "jsonwebtoken";
import { NODE_ENV, PUBLIC_KEY } from "./constants";
import models from "./database";

import archivePostDeadlineOpportunities from "./utils/archivePostDeadlineOpportunities";

const schedule = require("node-schedule");

const job = schedule.scheduleJob("8 * * * *", archivePostDeadlineOpportunities);

const app = express();

const allowedOrigins =
	/^https?:\/\/(?:localhost|opportunities(?:-api)?\.stuysu\.org)|opportunities(stuysu)?\.netlify\.(?:com|app)$/;

apolloServer.start().then(() =>
	app.use(
		"/graphql",
		cors({
			origin: (origin, callback) => {
				if (!origin || allowedOrigins.test(origin) || NODE_ENV === "development") {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
			credentials: true
		}),
		json(),
		expressMiddleware(apolloServer, {
			context: async ({ req, res }) => {
				let user, signedIn;
				let jwt;

				if (req.cookies) {
					jwt = req.cookies["auth-jwt"];
				}

				if (!jwt && req.headers) {
					jwt = req.headers["x-access-token"] || req.headers["authorization"];
				}
				if (jwt && jwt.startsWith("Bearer ")) {
					jwt = jwt.replace("Bearer ", "");
				}
				if (jwt) {
					try {
						const data = await verify(jwt, PUBLIC_KEY);
						if (data) {
							user = await models.users.findOne({
								where: {
									id: data.user.id
								}
							});
							signedIn = Boolean(user);
						}
					} catch (e) {}
				}

				function authenticationRequired() {
					if (!signedIn) {
						throw new ForbiddenError("You must be signed in to perform that query");
					}
				}

				function facultyRequired() {
					authenticationRequired();
					if (!user.isFaculty) {
						throw new ForbiddenError("You don't have the necessary permissions to perform that query");
					}
				}

				const setCookie = (...a) => res.cookie(...a);
				return {
					signedIn,
					user,
					authenticationRequired,
					facultyRequired,
					models,
					setCookie
				};
			}
		})
	)
);

app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}`));
