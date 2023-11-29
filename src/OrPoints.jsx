import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { Html } from "@react-three/drei";

export default function OrPoints() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  
  const { scene, nodes } = useGLTF(
    "https://cdn.glitch.global/10b345a3-95cd-4ca0-8235-797211874091/mypeeg.glb?v=1701280505888"
  );
  
  console.log(nodes)
  
  // nodes.name.geometry
  
  return(
    <points scale={[2, 2, 2]} rotation={[Math.PI / 2, 0, 0]} geometry={nodes.model_mesh.geometry}>
      
      <pointsMaterial size={0.001} map={nodes.model_mesh.material.map} />
    </points>
  );
}



// function LocationMarker(props) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [dotColor, setDotColor] = useState("red");
//   const { position, name } = props;

//   //conditional rendering
//   return (
//     <mesh
//       onClick={() => {
//         //if you want more than one thing to happen
//         //wrap these functions with a pair of curly bracket
//         setIsExpanded(true);
//         setDotColor("white");
//       }}
//       onPointerLeave={() => {
//         setIsExpanded(false);
//         setDotColor("red");
//       }}
      
//       position={position}
//       scale={[0.01, 0.01, 0.01]}
//     >
//       {/*
//       CONDITIONAL RENDERING
//       take html as a whole and wrap it in curly bracket
      
//       if isExpanded is true, mount <Html>
//       if isExpanded is/turn false, unmount it
//       */}

//       {isExpanded && (
//         <Html>
//           <div
//             style={{
//               color: "white",
//               padding: "10px",
//               background: "grey",
//               borderRadius: "5px",
//             }}
//           >
//             {name}
//           </div>
//         </Html>
//       )}

//       <sphereGeometry />
//       <meshBasicMaterial color={dotColor} />
//     </mesh>
//   );
// }

// export default LocationMarker;
