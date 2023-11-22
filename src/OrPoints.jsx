import { useGLTF } from "@react-three/drei";

export default function OrPoints() {
  const { scene, nodes } = useGLTF(
    "https://cdn.glitch.global/4e06d88a-729c-4a08-ae21-a34b63405225/or.glb?v=1700664866721"
  );
  
  console.log(nodes)
  
  // nodes.room.geometry
  // nodes.bed.geometry
  // nodes.other_object.geometry
  

  return(
    <points scale={[2, 2, 2]} rotation={[Math.PI / 2, 0, 0]} geometry={nodes.model_mesh.geometry}>
      <pointsMaterial size={0.001} map={nodes.model_mesh.material.map} />
    </points>
  );
}
