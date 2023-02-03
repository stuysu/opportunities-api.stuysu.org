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

Generate an ES512 key pair for use in verifying JWTs.

```shell
openssl ecparam -genkey -name secp521r1 -noout -out ecdsa-p521-private.pem
openssl ec -in ecdsa-p521-private.pem -pubout -out ecdsa-p521-public.pem
```

(Source: [ozomer](https://github.com/auth0/node-jwa/issues/23))

Configure environment variables in the `.env` config file

```shell
# either one, if neither are defined, defaults to local sqlite
SEQUELIZE_URL=
DATABASE_URL=

# randomized string, used to ensure token security
SESSION_SECRET=

# paste your public and private keys here WITH QUOTES for multiline data
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
aWYgeW91cmUgcmVhZGluZyB0IGhpcyB5b3VyZSBhIG5lcmQgbG9sCgpidXQgdG8gYmUgZmFpciB3
ZSdyZSBhbGwgcHJvZ3JhbW1lcnMgaGVyZQoKLi4uLgoKaG93cyB5b3VyIGRheSBiZWVuCml2ZSBi
ZWVuIGZpZ3VyaW5nIG91dCBSUzUxMiBhbmQgc3R1ZmYgdG8gc2V0IHVwIGEgZ29vZ2xlIG9hdXRo
IHRoaW5nCgpkbyB5b3UgdGhpbmsgcGVvcGxlIHdpbGwgYWN0dWFsbHkgcmVhZCB0aGlzCgoKCg==
-----END PUBLIC KEY-----"

PRIVATE_KEY="-----BEGIN EC PRIVATE KEY-----
dWhoaGgKCmhvd3MgdGhpbmdzIGJlZW4gZm9yIHlvdQoKLi4uCgoKCi4uLgoKCgoK
CgouLi4KCgoKCi4uLiBvaCBpIGRpZG50IHRoaW5rIHlvdSB3b3VsZCBhY3R1YWxs
eSBsb29rIGhlcmUKaW0gYSBzdGF0aWMgYmxvY2sgb2YgdGV4dCBzbyBpIGNhbnQg
cmVzcG9uZApidXQgdWgKCnlheXkgaWYgaXQgd2FzIGdvb2QKaXRsbCBnZXQgYmV0
dGVyIGlmIGl0IHdhcyBiYWQKCgo=
-----END EC PRIVATE KEY-----"
# (these are non-working examples)
```

For local development: start dev server

```shell
npm run dev
```

Deploy server

```shell
npm run start
```
