"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model() {
	const result = useGLTF("/models/space-ship.glb");
	return <primitive object={result.scene} scale={0.03} />;
}

export function Rocket() {
	return (
		<div className="h-screen w-full">
			<Canvas camera={{ position: [2, 2, 2] }}>
				<OrbitControls />
				<directionalLight intensity={3} position={[5, 5, 5]} />
				<Model />
			</Canvas>
		</div>
	);
}
