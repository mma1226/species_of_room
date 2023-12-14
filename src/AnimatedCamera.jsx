import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import { AnimationTimeline } from "./AnimationTimeline";

function AnimatedCamera() {
  const cameraRef = useRef();

  useEffect(() => {
    // Here we define the entire sequence of animations for the camera using GSAP
    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 5,
        z: 5,
      },
      "top"
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y:0
      },
      "middle"
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: -1,
        z: 10,
      },
      "bottom"
    );

    return () => CameraTimeline.kill();
  }, []);
  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 10]} />
  );
}

export default AnimatedCamera;
