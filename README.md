# Opportunities API
This is the backend for [opportunities.stuysu.org](https://opportunities.stuysu.org).

## Quickstart
Clone the repository
```shell
git clone https://github.com/stuysu/opportunities-api.stuysu.org.git
```

Install `node_modules`
```shell
npm i
```

For local development: run SQLite DB migrations
```shell
npm run migrate
```

Configure environment variables in the `.env` config file
```shell
# either one, if neither are defined, defaults to local sqlite
SEQUELIZE_URL=
DATABASE_URL=

# randomized string, used to ensure token security
SESSION_SECRET=

#
PUBLIC_KEY=
PRIVATE_KEY=
```

For local development: start dev server
```shell
npm run dev
```

Deploy server
```shell
npm run start
```
