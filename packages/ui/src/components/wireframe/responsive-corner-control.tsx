import { cn } from "@oss/ui/lib/utils";

type ResponsiveCornerControlProps = {
	side: "left" | "right";
	selected: "navbar" | "sidebar";
	onSelect: (value: "navbar" | "sidebar") => void;
};

export function ResponsiveCornerControl({
	side,
	selected,
	onSelect,
}: ResponsiveCornerControlProps) {
	const renderNavbarDominant = () => (
		<div className="size-full">
			{/* Top nav bar takes full width */}
			<div className="h-[25%] w-full bg-yellow-500" />

			<div className="flex h-[50%]">
				{side === "left" && <div className="h-full w-[30%] bg-blue-500" />}
				<div className="h-full flex-1" />
				{side === "right" && <div className="h-full w-[30%] bg-blue-500" />}
			</div>

			{/* Bottom nav bar takes full width */}
			<div className="h-[25%] w-full bg-purple-500" />
		</div>
	);

	const renderSidebarDominant = () => (
		<div className="size-full">
			<div className="flex h-[25%]">
				{/* Sidebar takes the corner */}
				{side === "left" && <div className="h-full w-[30%] bg-blue-500" />}

				{/* Top nav bar */}
				<div className="h-full flex-1 bg-yellow-500" />

				{side === "right" && <div className="h-full w-[30%] bg-blue-500" />}
			</div>

			<div className="flex h-[50%]">
				{side === "left" && <div className="h-full w-[30%] bg-blue-500" />}
				<div className="h-full flex-1" />
				{side === "right" && <div className="h-full w-[30%] bg-blue-500" />}
			</div>

			<div className="flex h-[25%]">
				{/* Sidebar takes the corner */}
				{side === "left" && <div className="h-full w-[30%] bg-blue-500" />}

				{/* Bottom nav bar */}
				<div className="h-full flex-1 bg-purple-500" />

				{side === "right" && <div className="h-full w-[30%] bg-blue-500" />}
			</div>
		</div>
	);

	return (
		<div className="flex gap-2">
			<button
				className={cn(
					"relative size-16 overflow-hidden rounded-md border-2 transition-all hover:scale-105",
					selected === "navbar"
						? "border-primary ring-2 ring-primary ring-offset-2"
						: "border-border hover:border-primary/50"
				)}
				onClick={() => onSelect("navbar")}
				type="button"
			>
				{renderNavbarDominant()}
			</button>

			<button
				className={cn(
					"relative size-16 overflow-hidden rounded-md border-2 transition-all hover:scale-105",
					selected === "sidebar"
						? "border-primary ring-2 ring-primary ring-offset-2"
						: "border-border hover:border-primary/50"
				)}
				onClick={() => onSelect("sidebar")}
				type="button"
			>
				{renderSidebarDominant()}
			</button>
		</div>
	);
}
