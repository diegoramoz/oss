"use client";

import {
	GizmoHelper,
	GizmoViewport,
	OrbitControls,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { type Mesh, type SpotLight, SpotLightHelper } from "three";

function Model() {
	const result = useGLTF("/models/space-ship.glb");
	return <primitive object={result.scene} scale={0.05} />;
}

function SphereWithTexture() {
	const texture = useTexture("/textures/texture.jpg");
	return (
		<mesh position={[2, 1, 0]}>
			<sphereGeometry args={[1, 32, 32]} />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
}

function LightWithHelper() {
	const light = useRef<SpotLight>(null);
	const { position, rotation, angle, penumbra } = useControls({
		position: { value: { x: 4, y: 2, z: 3 }, step: 0.1 },
		rotation: { value: [0, 0, 0], step: 0.1 },
		angle: { value: Math.PI / 8, min: 0, max: Math.PI / 2, step: 0.01 },
		penumbra: { value: 0.5, min: 0, max: 1, step: 0.01 },
	});

	useEffect(() => {
		if (light.current) {
			const helper = new SpotLightHelper(light.current, "orange");
			light.current.add(helper);

			return () => {
				light.current?.remove(helper);
				helper.dispose();
			};
		}
	}, []);

	return (
		<spotLight
			angle={angle}
			intensity={50}
			penumbra={penumbra}
			position={[position.x, position.y, position.z]}
			ref={light}
			rotation={rotation}
		/>
	);
}

export function AnimatedTorusKnot() {
	const torusKnotRef = useRef<Mesh>(null);

	const { speed, color } = useControls({
		color: { value: "#ff0000" },
		speed: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
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
		<mesh ref={torusKnotRef}>
			<torusKnotGeometry args={[1, 0.3, 128, 32]} />
			{/* <boxGeometry args={[1, 1, 1]} /> */}
			<axesHelper args={[4]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
}

export function Render() {
	return (
		<div className="h-screen w-full">
			<Canvas camera={{ position: [2, 2, 2] }}>
				<GizmoHelper alignment="bottom-right" margin={[80, 80]}>
					<GizmoViewport />
				</GizmoHelper>
				<gridHelper args={[10, 10]} />
				<axesHelper args={[5]} />
				<OrbitControls />
				{/* <FirstPersonControl s /> */}
				{/* <AnimatedTorusKnot /> */}
				{/* <directionalLight intensity={1} position={[2, 5, 1]} /> */}
				<ambientLight intensity={0.2} />
				<LightWithHelper />
				<Model />
				<SphereWithTexture />
			</Canvas>
		</div>
	);
}
