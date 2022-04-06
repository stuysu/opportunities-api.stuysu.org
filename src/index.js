import express from "express";

import apolloServer from "./graphql";

const app = express();

apolloServer.start().then(() => apolloServer.applyMiddleware({ app, path: "/graphql", cors: false}));

// dev env for now
// export default app;

app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}`))
