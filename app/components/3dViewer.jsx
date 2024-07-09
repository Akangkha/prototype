"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Box3, Vector3 } from "three";

const ObjModel = ({ objUrl, scale }) => {
  const obj = useLoader(OBJLoader, objUrl);

  useEffect(() => {
    const box = new Box3().setFromObject(obj);
    const center = box.getCenter(new Vector3());
    obj.position.sub(center);
  }, [obj]);

  return <primitive object={obj} scale={scale} />;
};

const App = () => {
  return (
    <div style={{ width: "200px", height: "400px" }} className="m-12 relative">
      <Canvas
        style={{ height: "100%", width: "100%" }}
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <ObjModel objUrl="/3D.obj" scale={[0.5, 0.5, 0.5]} />
        <OrbitControls />
      </Canvas>
      <p className="font-bold w-full text-center" >Your Personalized 3D Body Replica</p>
    </div>
  );
};

export default App;
