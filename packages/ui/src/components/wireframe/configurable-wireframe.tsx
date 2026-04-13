"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@oss/ui/components/tooltip";
import {
	Wireframe,
	WireframeNav,
	WireframeSidebar,
	WireframeStickyNav,
} from "@oss/ui/components/wireframe";
import { useWireframeConfig } from "@oss/ui/components/wireframe/wireframe-config-provider";
import { cn } from "@oss/ui/lib/utils";
import type React from "react";
import { useState } from "react";

function ComponentName({ title, code }: { title: string; code: string }) {
	return (
		<Tooltip>
			<TooltipTrigger>
				<span className="rounded bg-background px-2 py-0.5 font-semibold">
					{title}
				</span>
			</TooltipTrigger>
			<TooltipContent>
				<span className="rounded px-1 font-mono text-sm">{code}</span>
			</TooltipContent>
		</Tooltip>
	);
}

export function ConfigurableWireframe({
	children,
}: {
	children: React.ReactNode;
}) {
	const { config } = useWireframeConfig();
	const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
	const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

	return (
		<Wireframe
			config={{
				safeAreas: true,
				cssVariables: config.cssVariables,
				corners: config.corners,
			}}
		>
			{/* Render the appropriate nav type */}
			{config.navType === "normal" && (
				<>
					{config.showTopNav && (
						<WireframeNav position="top">
							<div className="flex h-full items-center justify-center bg-green-200 px-4 dark:bg-green-900">
								<ComponentName
									code={`<WireframeNav position="top"/>`}
									title="Top Navigation"
								/>
							</div>
						</WireframeNav>
					)}
					{config.showBottomNav && (
						<WireframeNav position="bottom">
							<div className="flex h-full items-center justify-center bg-purple-200 px-4 dark:bg-purple-900">
								<ComponentName
									code={`<WireframeNav position="bottom"/>`}
									title="Bottom Navigation"
								/>
							</div>
						</WireframeNav>
					)}
				</>
			)}

			{config.navType === "sticky" && (
				<WireframeStickyNav>
					<div className="flex h-full items-center justify-center bg-rose-200 px-4 dark:bg-rose-900">
						<ComponentName code={"<StickyNav />"} title="Sticky Navigation" />
					</div>
				</WireframeStickyNav>
			)}

			{config.navType === "responsive" && (
				<WireframeNav position="responsive">
					<div className="flex h-full items-center justify-center bg-yellow-200 px-4 dark:bg-yellow-900">
						<ComponentName
							code={'<WireframeNav position="responsive" />'}
							title="Responsive Navigation"
						/>
					</div>
				</WireframeNav>
			)}
			{/* Render left sidebar if enabled */}
			{config.showLeftSidebar && (
				<WireframeSidebar collapsed={leftSidebarCollapsed} position="left">
					<div className="min-h-full bg-blue-200 p-4 dark:bg-blue-900">
						<div
							className={cn(
								"mb-4 flex items-center justify-between",
								leftSidebarCollapsed && "justify-center"
							)}
						>
							{leftSidebarCollapsed === false && (
								<ComponentName
									code={`<WireframeSidebar position="left" collapsed={false} />`}
									title="Left Sidebar"
								/>
							)}

							<button
								className="p-2 hover:underline"
								onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
								type="button"
							>
								{leftSidebarCollapsed ? "→" : "←"}
							</button>
						</div>
						{leftSidebarCollapsed === false && (
							<div className="h-[1000px] border border-border" />
						)}
					</div>
				</WireframeSidebar>
			)}

			{/* Render right sidebar if enabled */}
			{config.showRightSidebar && (
				<WireframeSidebar collapsed={rightSidebarCollapsed} position="right">
					<div className="min-h-full bg-blue-200 p-4 dark:bg-blue-900">
						<div
							className={cn(
								"mb-4 flex flex-row-reverse items-center justify-between",
								rightSidebarCollapsed && "justify-center"
							)}
						>
							{rightSidebarCollapsed === false && (
								<ComponentName
									code={`<WireframeSidebar position="right" collapsed={false} />`}
									title="Right Sidebar"
								/>
							)}

							<button
								className="p-2 hover:underline"
								onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
								type="button"
							>
								{rightSidebarCollapsed ? "←" : "→"}
							</button>
						</div>
						{rightSidebarCollapsed === false && (
							<div className="h-[1000px] border border-border" />
						)}
					</div>
				</WireframeSidebar>
			)}

			{children}
		</Wireframe>
	);
}
