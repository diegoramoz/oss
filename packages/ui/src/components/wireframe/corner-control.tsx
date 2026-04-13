import { LayoutPreviewButton } from "./layout-preview-button";

type CornerControlProps = {
	corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
	selected: "navbar" | "sidebar";
	onSelect: (value: "navbar" | "sidebar") => void;
};

export function CornerControl({
	corner,
	selected,
	onSelect,
}: CornerControlProps) {
	const isTopLeft = corner === "topLeft";
	const isTopRight = corner === "topRight";
	const isBottomLeft = corner === "bottomLeft";
	const isBottomRight = corner === "bottomRight";

	const renderNavbarDominant = () => (
		<div className="size-full">
			{/* Top nav bar */}
			{(isTopLeft || isTopRight) && (
				<div className="h-[30%] w-full bg-green-500" />
			)}

			<div className="flex h-[70%]">
				{/* Left sidebar */}
				{isTopLeft && <div className="h-full w-[30%] bg-blue-500" />}
				{isBottomLeft && <div className="h-full w-[30%] bg-blue-500" />}

				{/* Middle content */}
				<div className="h-full flex-1" />

				{/* Right sidebar */}
				{isTopRight && <div className="h-full w-[30%] bg-blue-500" />}
				{isBottomRight && <div className="h-full w-[30%] bg-blue-500" />}
			</div>

			{/* Bottom nav bar */}
			{(isBottomLeft || isBottomRight) && (
				<div className="h-[30%] w-full bg-purple-500" />
			)}
		</div>
	);

	const renderSidebarDominant = () => (
		<div className="size-full">
			{(isTopLeft || isTopRight) && (
				<div className="flex h-[30%]">
					{/* Left sidebar takes top-left corner */}
					{isTopLeft && <div className="h-full w-[30%] bg-blue-500" />}

					{/* Top nav bar */}
					<div className="h-full flex-1 bg-green-500" />

					{/* Right sidebar takes top-right corner */}
					{isTopRight && <div className="h-full w-[30%] bg-blue-500" />}
				</div>
			)}

			<div className="flex h-[70%]">
				{/* Left sidebar */}
				{(isTopLeft || isBottomLeft) && (
					<div className="h-full w-[30%] bg-blue-500" />
				)}

				{/* Middle content */}
				<div className="h-full flex-1" />

				{/* Right sidebar */}
				{(isTopRight || isBottomRight) && (
					<div className="h-full w-[30%] bg-blue-500" />
				)}
			</div>

			{(isBottomLeft || isBottomRight) && (
				<div className="flex h-[30%]">
					{/* Left sidebar takes bottom-left corner */}
					{isBottomLeft && <div className="h-full w-[30%] bg-blue-500" />}

					{/* Bottom nav bar */}
					<div className="h-full flex-1 bg-purple-500" />

					{/* Right sidebar takes bottom-right corner */}
					{isBottomRight && <div className="h-full w-[30%] bg-blue-500" />}
				</div>
			)}
		</div>
	);

	return (
		<div className="flex gap-2">
			<LayoutPreviewButton
				onClick={() => onSelect("navbar")}
				selected={selected === "navbar"}
			>
				{renderNavbarDominant()}
			</LayoutPreviewButton>

			<LayoutPreviewButton
				onClick={() => onSelect("sidebar")}
				selected={selected === "sidebar"}
			>
				{renderSidebarDominant()}
			</LayoutPreviewButton>
		</div>
	);
}
