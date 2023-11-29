import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";

export default function ModelPoints() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { scene, nodes } = useGLTF(
    "https://cdn.glitch.global/10b345a3-95cd-4ca0-8235-797211874091/mypeeg.glb?v=1701280505888"
  );

  console.log(nodes);

  // nodes.room.geometry
  // nodes.bed.geometry
  // nodes.other_object.geometry

  return (
    <points
      onPointerOver={() => {
        //if you want more than one thing to happen
        //wrap these functions with a pair of curly bracket
        setIsExpanded(true);
      }}
      onPointerLeave={() => {
        setIsExpanded(false);
      }}
      scale={[10, 10, 10]}
      rotation={[Math.PI / 2, 0, 0]}
      geometry={nodes.textured001.geometry}
    >
      {isExpanded && (
        <Html>
          <div
            style={{
              color: "white",
              padding: "10px",
              background: "grey",
              borderRadius: "5px",
            }}
          >
            "hello"
          </div>
        </Html>
      )}

      <pointsMaterial size={0.01} map={nodes.textured001.material.map} />
    </points>
  );
}
