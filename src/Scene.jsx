import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { BackSide } from "three";
import { Environment, Float, Preload, Sparkles } from "@react-three/drei";

import AnimatedCamera from "./AnimatedCamera";

import ModelPoints from "./ModelPoints";
import FX from "./FX";

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
            position: item.position,
          };
        });

        setDataPoints(mappedData);
      });
    });
  }, []);

  return (
    <div id="canvas_wrapper">
      <Canvas>
        <FX />
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
        <color args={["black"]} attach="background" />

        {/* Data points turned into geometry with it's own interaction 📌 */}

        {/* not storing the mutated thing, 
        but using the map() function to loop through the array
        and mount 241 components, each with specific positions
        */}

        {dataPoints.map(
          //map over the dataPoints array with the argument named item and return an instance of the ModelPoints component.
          //for each item, return a component (item)
          (item) => (
            <Suspense>
              <Float
                speed={1} // Animation speed, defaults to 1
                rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[-0.3, 0.3]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
              >
                <Sparkles
                  count={50}
                  scale={10}
                  size={0.5}
                  speed={0.1}
                />
                <ModelPoints
                  key={item.name}
                  name={item.name}
                  src={item.src}
                  text={item.text}
                  position={item.position}
                  rotationSpeed={0.0001}
                />
              </Float>
            </Suspense>
          )
        )}

        <Preload all />
      </Canvas>
    </div>
  );
}

export default Scene;
