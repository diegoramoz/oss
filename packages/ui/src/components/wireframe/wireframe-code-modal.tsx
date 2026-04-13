"use client";

import { Button } from "@oss/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@oss/ui/components/dialog";
import {
	defaultCSSVariables,
	useWireframeConfig,
} from "@oss/ui/components/wireframe/wireframe-config-provider";
import { Check, Code2, Copy } from "lucide-react";
import { useState } from "react";

export function WireframeCodeModal() {
	const { config } = useWireframeConfig();
	const [copied, setCopied] = useState(false);
	const [open, setOpen] = useState(false);

	const buildCornersCode = () => {
		const corners = [
			{ key: "topLeft", value: config.corners.topLeft },
			{ key: "topRight", value: config.corners.topRight },
			{ key: "bottomLeft", value: config.corners.bottomLeft },
			{ key: "bottomRight", value: config.corners.bottomRight },
		];

		const cornerEntries = corners
			.filter((corner) => corner.value !== "sidebar")
			.map((corner) => `      ${corner.key}: "${corner.value}"`);

		const responsiveCorners = [
			{ key: "left", value: config.corners.responsive.left },
			{ key: "right", value: config.corners.responsive.right },
		];

		const responsiveEntries = responsiveCorners
			.filter((corner) => corner.value !== "sidebar")
			.map((corner) => `        ${corner.key}: "${corner.value}"`);

		if (responsiveEntries.length > 0) {
			cornerEntries.push(
				`      responsive: {\n${responsiveEntries.join(",\n")}\n      }`
			);
		}

		return cornerEntries.length > 0
			? `    corners: {\n${cornerEntries.join(",\n")}\n    },\n`
			: "";
	};

	const generateCode = () => {
		const sidebarStatus: string[] = [];
		if (config.showLeftSidebar) {
			sidebarStatus.push("Left");
		}
		if (config.showRightSidebar) {
			sidebarStatus.push("Right");
		}

		// Filter out CSS variables that match default values
		const nonDefaultCssVars = Object.entries(config.cssVariables).filter(
			([key, value]) =>
				(defaultCSSVariables as Record<string, number | undefined>)[key] !==
				value
		);

		const cssVarsCode =
			nonDefaultCssVars.length > 0
				? `    cssVariables: {\n${nonDefaultCssVars
						.map(([key, value]) => `      "${key}": ${value}`)
						.join(",\n")}\n    },\n`
				: "";

		const cornersCode = buildCornersCode();
		const hasConfig = cssVarsCode || cornersCode;

		return `<Wireframe${
			hasConfig
				? `
  config={{
${cssVarsCode}${cornersCode}  }}`
				: ""
		}>
  ${(() => {
		if (config.navType === "normal") {
			const parts: string[] = [];
			if (config.showTopNav) {
				parts.push(`<WireframeNav position="top">
    {/* children */}
  </WireframeNav>`);
			}
			if (config.showBottomNav) {
				parts.push(`<WireframeNav position="bottom">
    {/* children */}
  </WireframeNav>`);
			}
			return parts.join("\n  ");
		}
		if (config.navType === "responsive") {
			return `<WireframeNav position="responsive">
    {/* children */}
  </WireframeNav>`;
		}
		return `<WireframeStickyNav>
     {/* children */}
  </WireframeStickyNav>`;
	})()}

  ${
		config.showLeftSidebar
			? `<WireframeSidebar
    collapsed={leftSidebarCollapsed}
    position="left"
  >
    {/* children */}
  </WireframeSidebar>

  `
			: ""
	}${
		config.showRightSidebar
			? `<WireframeSidebar
    collapsed={rightSidebarCollapsed}
    position="right"
  >
    {/* children */}
  </WireframeSidebar>

  `
			: ""
	}{/* children */}
</Wireframe>`;
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(generateCode());
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger>
				{/* <Button className="size-12 rounded-full" size="icon" variant="default"> */}
				<Code2 className="size-5" />
				<span className="sr-only">View Code</span>
				{/* </Button> */}
			</DialogTrigger>
			<DialogContent className="flex max-h-[90dvh] max-w-3xl flex-col sm:max-h-[85vh]">
				<DialogHeader className="shrink-0">
					<DialogTitle>Wireframe Configuration</DialogTitle>
					<DialogDescription>
						Copy this code to use your current wireframe configuration
					</DialogDescription>
				</DialogHeader>
				<div className="relative min-h-0 flex-1 overflow-auto">
					<pre className="rounded-lg bg-muted p-4 font-mono text-sm">
						<code>{generateCode()}</code>
					</pre>
					<Button
						className="absolute top-2 right-2"
						onClick={handleCopy}
						size="sm"
						variant="secondary"
					>
						{copied ? (
							<>
								<Check className="mr-2 size-4" />
								Copied!
							</>
						) : (
							<>
								<Copy className="mr-2 size-4" />
								Copy
							</>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
