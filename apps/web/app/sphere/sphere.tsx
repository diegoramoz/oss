"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function SphereWithTexture() {
	const texture = useTexture("/textures/texture.jpg");

	return (
		<mesh rotation={[3.4, 4.3, 3.9]}>
			<sphereGeometry args={[1, 32, 32]} />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
}

export function Sphere() {
	return (
		<div className="h-screen w-full">
			<Canvas camera={{ position: [2, 2, 2] }}>
				<OrbitControls />
				<ambientLight intensity={0.2} />
				<spotLight
					angle={Math.PI / 8}
					intensity={50}
					penumbra={0.5}
					position={[4, 2, 3]}
				/>
				<SphereWithTexture />
			</Canvas>
		</div>
	);
}
