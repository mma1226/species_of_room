import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BackSide } from "three";
import { Environment } from "@react-three/drei";

import AnimatedCamera from "./AnimatedCamera";
import OrangeAnimatedHighlight from "./OrangeAnimatedHighlight";

import ModelPoints from "./ModelPoints";
function Scene() {
  return (
    <div id="canvas_wrapper">
      <Canvas>
        <Environment preset="night" />

        {/* Camera 🎥 */}
        <AnimatedCamera />

        {/* Lights 💡 */}
        <ambientLight intensity={0.15} color="white" />
        <pointLight color="green" position={[1, 1, 1]} intensity={3} />
        <pointLight color="yellow" position={[-2, 3, 1]} intensity={3} />
        <pointLight color="blue" position={[2, 3, 1]} intensity={3} />
        <pointLight color="white" position={[0, 1, 2.5]} intensity={3} />

        {/* We can create a background color as a child element of the canvas we just have to attach it */}
        <color args={["grey"]} attach="background" />

        {/* Objects 📦 -> <primitive /> 
        <points position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[5, 5, 5, 128, 128, 128]} />
          <pointsMaterial size={0.01} side={BackSide} />
        </points>
        */}

        <Suspense>
          <ModelPoints />
        </Suspense>

      </Canvas>
    </div>
  );
}

export default Scene;
