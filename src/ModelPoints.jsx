import { useGLTF, Html, Box } from "@react-three/drei";
import { useState, useRef } from "react";
import {useFrame} from "@react-three/fiber";

export default function ModelPoints(props) {
  const { name, src, text, position, rotationSpeed } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const { scene, nodes } = useGLTF(src);
  let model = Object.values(nodes)[1];
  
  const modelRef = useRef();

  useFrame(()=>{
    modelRef.current.rotation.y += rotationSpeed;
  })
  
  return (
    <group >
      <Box
        position={position}
        visible={false}
        onPointerEnter={() => {
          //if you want more than one thing to happen
          //wrap these functions with a pair of curly bracket
          console.log("hovered");
          setIsExpanded(true);
        }}
        onPointerLeave={() => {
          setIsExpanded(false);
        }}
      />
      <points
        scale={[5, 5, 5]}
        position={position}
        geometry={model.geometry}
        ref={modelRef}
      >
        {isExpanded && (
          <Html>
            <div
              style={{
                fontFamily:"'Courier New', monospace",
                color: "rgb(204,222,224)",
                padding: "10px",
                background: "rgb(255,255,255,0.2)",
                borderRadius: "5px",
              }}
            >
              {text}
            </div>
          </Html>
        )}

        <pointsMaterial size={0.01} map={model.material.map} />
      </points>
    </group>
  );
}
