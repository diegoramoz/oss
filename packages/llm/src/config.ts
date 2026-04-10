import { env } from "./env";

export type Config = {
	OLLAMA_MODEL: string;
	OLLAMA_URL: string;
};

export function loadConfig(): Config {
	return {
		OLLAMA_MODEL: env.OLLAMA_MODEL,
		OLLAMA_URL: env.OLLAMA_URL,
	};
}
