"use client"
// src/components/ObjModel.js
import React, { useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/examples/jsm/loaders/TextureLoader';

const ObjModel = ({ objUrl, textureUrl, scale }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new OBJLoader();
    const textureLoader = new TextureLoader();

    loader.load(objUrl, (obj) => {
      if (textureUrl) {
        const texture = textureLoader.load(textureUrl);
        obj.traverse((child) => {
          if (child.isMesh) child.material.map = texture;
        });
      }
      setModel(obj);
    });

    return () => {
      loader.dispose();
      textureLoader.dispose();
    };
  }, [objUrl, textureUrl]);

  return model ? <primitive object={model} scale={scale} /> : null;
};

export default ObjModel;
