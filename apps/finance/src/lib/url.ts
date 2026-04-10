import { env } from "@oss/env/finance";

export function getBaseUrl() {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
		: `http://localhost:${env.PORT ?? 3002}`;
}
