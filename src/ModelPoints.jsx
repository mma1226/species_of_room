import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";

export default function ModelPoints(props) {

  const {name, src, text} = props;
  
  const [isExpanded, setIsExpanded] = useState(false);

  const { scene, nodes } = useGLTF(src);

  console.log(Object.keys(nodes));
  let model_name = Object.keys(nodes)[1];
  console.log(typeof model_name)

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
      geometry={Object.key(nodes)[1].geometry}
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
            {text}
          </div>
        </Html>
      )}

      <pointsMaterial size={0.01} map={Object.key(nodes)[1].material.map} />
    </points>
  );
}
