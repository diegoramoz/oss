"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import type { Mesh } from "three";

function AnimatedTorusKnot({ type }: { type: "TOON" | "STANDARD" }) {
	const torusKnotRef = useRef<Mesh>(null);

	const { speed, color } = useControls({
		color: { value: "#4eff4a" },
		speed: { value: 0.005, min: 0, max: 0.01, step: 0.001 },
	});

	useFrame(() => {
		const mesh = torusKnotRef.current;
		if (mesh) {
			mesh.rotation.x += speed;
			mesh.rotation.y += speed;
			mesh.rotation.z += speed;
		}
	});

	return (
		<mesh
			position={type === "TOON" ? [-2, 0, 0] : [2, 0, 0]}
			ref={torusKnotRef}
		>
			<torusKnotGeometry args={[1, 0.3, 128, 32]} />
			{type === "STANDARD" ? (
				<meshStandardMaterial color={color} />
			) : (
				<meshToonMaterial color={color} />
			)}
		</mesh>
	);
}

export function TorusKnot() {
	return (
		<div className="h-screen w-full">
			<Canvas camera={{ position: [2, 2, 2] }}>
				<OrbitControls />
				<directionalLight intensity={0.8} position={[2, 5, 1]} />
				<AnimatedTorusKnot type="TOON" />
				<AnimatedTorusKnot type="STANDARD" />
			</Canvas>
		</div>
	);
}
