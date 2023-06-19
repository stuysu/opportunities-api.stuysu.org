import path from "node:path";

/* DENO FIXES
import dotenv from "dotenv";
dotenv.config();
*/
import "https://deno.land/std@0.192.0/dotenv/load.ts";
/*import { dotEnvParser } from "https://deno.land/x/dotenv_parser@v1.0.2/mod.ts";
const decoder = new TextDecoder("utf-8");
const raw = Deno.readFileSync(".env");
const data = decoder.decode(raw);
const parsed = dotEnvParser(data);
for (let key in parsed) {
	console.log(key, parsed[key]);
	Deno.env.set(key, parsed[key]);
}
*/
const decoder = new TextDecoder("utf-8");
const files = {
	'PRIVATE_KEY': 'ecdsa-p521-private.pem',
	'PUBLIC_KEY': 'ecdsa-p521-public.pem',
};
for (let key in files) {
	Deno.env.set(key, decoder.decode(Deno.readFileSync(files[key])).trim());
};


// Deno fixes part 2
import makeloc from 'https://deno.land/x/dirname@1.1.2/mod.ts'

const { __dirname,  __filename } = makeloc(import.meta);

const sqlitePath = path.resolve(__dirname, "app.db");

export const SEQUELIZE_URL = Deno.env.get("SEQUELIZE_URL") || Deno.env.get("DATABASE_URL") || `sqlite::${sqlitePath}`;

export const NODE_ENV = Deno.env.get("NODE_ENV") || "development";

export const GOOGLE_LOGIN_CLIENT_ID = "979775004862-gg66eb6tialnpivrvsjmq7j7hcosths7.apps.googleusercontent.com";

export const SESSION_SECRET = Deno.env.get("SESSION_SECRET") || "howdy";

export const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY");

export const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY");
console.log(Deno.env.has("PRIVATE_KEY"), JSON.stringify(PRIVATE_KEY));
console.log(Deno.env.has("PUBLIC_KEY"), JSON.stringify(PUBLIC_KEY));

export const WHITELISTED_EMAIL_DOMAINS = ["stuy.edu", "stuysu.org"]; // users with these email endings can create an account automatically
