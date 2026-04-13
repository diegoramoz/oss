"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { buttonVariants } from "@oss/ui/components/button";
import { ConfigurableWireframe } from "@oss/ui/components/wireframe/configurable-wireframe";
import { LayoutControlsPanel } from "@oss/ui/components/wireframe/layout-controls-panel";
import { WireframeCodeModal } from "@oss/ui/components/wireframe/wireframe-code-modal";
import { WireframeConfigProvider } from "@oss/ui/components/wireframe/wireframe-config-provider";
import { cn } from "@oss/ui/lib/utils";
import Link from "next/link";

function PlaygroundContent() {
	return (
		<>
			<ConfigurableWireframe>
				<div className="mx-auto max-w-4xl space-y-6 p-8">
					<div className="space-y-4">
						<h1 className="font-bold text-4xl">Wireframe Playground</h1>
						<p className="text-lg text-muted-foreground">
							Customize the wireframe layout using the controls below. Adjust
							navigation types, sidebar positions, corner behaviors, and
							fine-tune spacing with CSS variables.
						</p>
					</div>

					<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
						<LayoutControlsPanel />
					</div>
				</div>
			</ConfigurableWireframe>

			{/* Bottom Right Action Buttons */}
			<div className="fixed right-[calc(1.5rem+env(safe-area-inset-right))] bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-1000 flex gap-3">
				<WireframeCodeModal />
				<Link
					aria-label="View on GitHub"
					className={cn(
						"size-12 rounded-full",
						buttonVariants({ size: "icon", variant: "default" })
					)}
					href="https://github.com/zdiegoramos/wireframe"
					rel="noopener noreferrer"
					target="_blank"
				>
					<SiGithub className="size-6" />
				</Link>
			</div>
		</>
	);
}

export default function PlaygroundPage() {
	return (
		<WireframeConfigProvider>
			<PlaygroundContent />
		</WireframeConfigProvider>
	);
}
