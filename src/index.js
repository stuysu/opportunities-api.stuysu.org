import express from "express";
import cors from 'cors';

import apolloServer from "./graphql";

const app = express();


const allowedOrigins =
	/^https?:\/\/(?:localhost|opportunities(?:-api)?\.stuysu\.org)|opportunitiesstuysu\.netlify\.(?:com|app)$/;
app.use(
	cors({
		origin: (origin, callback) => {
			if (
				!origin ||
				allowedOrigins.test(origin) ||
				NODE_ENV === 'development'
			) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true
	})
);

apolloServer.start().then(() => apolloServer.applyMiddleware({ app, path: "/graphql", cors: false}));

// dev env for now
// export default app;

app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}`))
