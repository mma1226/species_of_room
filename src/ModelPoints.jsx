import { useGLTF, Html } from "@react-three/drei";
import { useState } from "react";

export default function ModelPoints(props) {
  

  const [dataPoints, setDataPoints] = useState([]);
  //empty dependency -> happen once, = on create function
  //get the data
  useEffect(() => {
    //return an asyncronous function ->Promise
    //you can chain asyncronous function
    fetch(
      "https://raw.githubusercontent.com/eesur/country-codes-lat-long/master/country-codes-lat-long-alpha3.json"
    ).then((response) => {
      //response.json() creates another Promise, which is parsed JSON file
      response.json().then((jsObject) => {
        //destructure object
        const { ref_country_codes } = jsObject;

        //clean Data!

        //these array functions loop through the array and operate on each item in the arry
        //filter(), map()

        //filter for missing data
        //filter() takes an item and a callback
        //filter() don't mutate the object, ie. take the ref_country_codes, make a copy, filter out
        //if latitdue or longitude has no data, this operation evaluates to false, and item will be filtered out
        const filteredData = ref_country_codes.filter((item) => {
          //filter() expects to get a true/false value
          return item.latitude && item.longitude;
        });

        //map the data to our sphere
        //map() also do not mutate
        //map() for each item in array, assign new values and properties, return the new thing
        const mappedData = filteredData.map(
          //for each item destructure the country and store it in a new variable called name
          (item) => {
            return {
              name: item.country,
              position: latLongToVector3(
                //lat, lon, radius
                item.latitude,
                item.longitude,
                1 //the size of the sphere
              ),
            };
          }
        );

        //store data! a.k.a. setState()
        setDataPoints(mappedData);
      });
    });
  }, []);
  
  
  
  
  
  const { index }= props;

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
