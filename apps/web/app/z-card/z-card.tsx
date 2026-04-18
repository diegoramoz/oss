"use client";

import { cn } from "@oss/ui/lib/utils";
import { type MouseEvent, useRef } from "react";

export function ZCard() {
	const cardRef = useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
		if (!cardRef.current) {
			return;
		}

		const card = cardRef.current;
		const rect = card.getBoundingClientRect();

		// Get mouse position relative to card center (-1 to 1)
		const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
		const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

		// Apply rotation (invert y for natural tilt)
		card.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
	};

	const handleMouseLeave = () => {
		if (!cardRef.current) {
			return;
		}
		cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
	};

	return (
		<div className="perspective-[1000px]">
			<button
				className={cn(
					// VERTICAL CARD
					"aspect-540/856 w-67.5",

					// HORIZONTAL CARD
					// "aspect-856/540 w-[428px]",
					"rounded bg-amber-200",
					"transform-3d transition-transform duration-200 ease-out"
				)}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				ref={cardRef}
				type="button"
			>
				card
			</button>
		</div>
	);
}
