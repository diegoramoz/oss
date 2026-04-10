import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		OLLAMA_MODEL: z.string().default("llama3.2-vision"),
		OLLAMA_URL: z.url().default("http://localhost:11434"),
		CF_TUNNEL_TOKEN: z.string().optional(),
		CF_TUNNEL_HOSTNAME: z.string().optional(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
