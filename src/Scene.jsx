import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { BackSide } from "three";
import { Environment } from "@react-three/drei";

import AnimatedCamera from "./AnimatedCamera";
import OrangeAnimatedHighlight from "./OrangeAnimatedHighlight";

import ModelPoints from "./ModelPoints";

function Scene() {
  //where to store data
  //[state, stateSetter]
  const [dataPoints, setDataPoints] = useState([]);
  //empty dependency -> happen once, = on create function
  //get the data
  useEffect(() => {
    //return an asyncronous function ->Promise
    //you can chain asyncronous function
    fetch("./src/model.json").then((response) => {
      
      //response.json() creates another Promise, which is parsed JSON file
      response.json().then((jsObject) => {
        //deconstruct object
        const { models } = jsObject;
        console.log(models);

        const mappedData = models.map((item) => {
          return {
            name: item.name,
            src: item.src,
            text: item.description,
          };
        });

        setDataPoints(mappedData);
      });
    });
  }, []);

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

    
        {/* Data points turned into geometry with it's own interaction 📌 */}

        {/* not storing the mutated thing, 
        but using the map() function to loop through the array
        and mount 241 components, each with specific positions
        */}
        
        {dataPoints.map(
          //for each item, return a component
          (item) => {
            <Suspense>
              <ModelPoints name={item.name} src={item.src} text={item.text} />
            </Suspense>;
          }
        )}
      </Canvas>
    </div>
  );
}

export default Scene;
