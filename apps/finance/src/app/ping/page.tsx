import "@/utils/orpc.server";
import { orpc } from "@/utils/orpc";
import { OllamaPingCard } from "./ollama-ping-card";
import { PingCard } from "./ping-card";

export const dynamic = "force-dynamic";

export default async function PingPage() {
	const [localMachine, ollama] = await Promise.all([
		orpc.ping.ping(),
		orpc.ollama.ping(),
	]);

	return (
		<main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
			<div className="mb-6">
				<h1 className="font-bold text-2xl">Cloudflare Tunnel — Ping</h1>
				<p className="mt-1 text-muted-foreground text-sm">
					Tests the connection from this deployed app to your local machine and
					Ollama LLM via Cloudflare Tunnels.
				</p>
			</div>

			<PingCard initial={localMachine} />
			<OllamaPingCard initial={ollama} />
		</main>
	);
}
