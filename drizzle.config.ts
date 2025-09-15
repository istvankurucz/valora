import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	driver: "expo",
	schema: "./src/db/schemas/**/*",
	out: "./src/db/migrations",
	strict: true,
	verbose: true,
});
