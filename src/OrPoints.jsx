import { useGLTF } from "@react-three/drei";

export default function OrPoints() {
  const { scene, nodes } = useGLTF(
    "https://cdn.glitch.global/10b345a3-95cd-4ca0-8235-797211874091/mypeeg.glb?v=1701280505888"
  );
  
  console.log(nodes)
  
  // nodes.room.geometry
  // nodes.bed.geometry
  // nodes.other_object.geometry
  

  return(
    <points scale={[10, 10, 10]} rotation={[Math.PI / 2, 0, 0]} geometry={nodes.textured001.geometry}>
      <pointsMaterial size={0.01} map={nodes.textured001.material.map} />
    </points>
  );
}
