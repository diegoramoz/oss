"use client";

import { Button } from "@oss/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@oss/ui/components/card";
import { useCallback, useState } from "react";
import { orpc } from "@/utils/orpc";

type PingResult = Awaited<ReturnType<typeof orpc.ollama.ping>>;

export function OllamaPingCard({ initial }: { initial: PingResult }) {
	const [result, setResult] = useState<PingResult>(initial);
	const [loading, setLoading] = useState(false);

	const ping = useCallback(async () => {
		setLoading(true);
		try {
			const data = await orpc.ollama.ping();
			setResult(data);
		} finally {
			setLoading(false);
		}
	}, []);

	const isOk = result.ok;
	const okLabel =
		isOk && result.modelReady
			? "Reachable — model ready"
			: "Reachable — model not pulled";
	const statusLabel = isOk ? okLabel : "Unreachable";

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Ollama LLM ping</CardTitle>
				<Button disabled={loading} onClick={ping} size="sm" variant="outline">
					{loading ? "Pinging…" : "Ping again"}
				</Button>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Status badge */}
				<div className="flex items-center gap-2">
					<span
						className={`inline-block h-2.5 w-2.5 rounded-full ${isOk ? "bg-green-500" : "bg-red-500"}`}
					/>
					<span className="font-medium text-sm">{statusLabel}</span>
				</div>

				{/* Raw response */}
				<pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm leading-relaxed">
					{JSON.stringify(result, null, 2)}
				</pre>

				{/* Explanation */}
				<div className="rounded-md border border-dashed p-4 text-muted-foreground text-sm">
					<p className="mb-1 font-medium text-foreground">How this works</p>
					{isOk ? (
						<ol className="list-decimal space-y-1 pl-4">
							<li>
								Called{" "}
								<code className="rounded bg-muted px-1">
									orpc.ollama.ping()
								</code>{" "}
								→ POST to{" "}
								<code className="rounded bg-muted px-1">/rpc/ollama/ping</code>.
							</li>
							<li>
								The server fetched{" "}
								<code className="rounded bg-muted px-1">{result.via}</code> with
								a Cloudflare Access service token.
							</li>
							{result.modelReady ? (
								<li>
									Model{" "}
									<code className="rounded bg-muted px-1">{result.model}</code>{" "}
									is pulled and ready — image extraction will work.
								</li>
							) : (
								<li>
									Model{" "}
									<code className="rounded bg-muted px-1">{result.model}</code>{" "}
									is <strong>not yet pulled</strong>. Run{" "}
									<code className="rounded bg-muted px-1">
										ollama pull {result.model}
									</code>{" "}
									on the LLM machine.
								</li>
							)}
						</ol>
					) : (
						<p>
							Could not reach{" "}
							<code className="rounded bg-muted px-1">{result.via}</code>. Make
							sure <code className="rounded bg-muted px-1">bun run start</code>{" "}
							is running inside{" "}
							<code className="rounded bg-muted px-1">packages/llm</code> and{" "}
							<code className="rounded bg-muted px-1">OLLAMA_URL</code> is set
							to the tunnel hostname.
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
