"use client";
// components/SplineViewer.js

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";

const SplineViewer = () => {
  const viewerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  const updateScale = () => {
    const containerRect = viewerRef.current.getBoundingClientRect();
    const newScale = Math.min(
      containerRect.width / 500,
      containerRect.height / 500
    );
    setScale(newScale);
  };

  useEffect(() => {
    updateScale(); // Initial scale update
    window.addEventListener("resize", updateScale); // Update scale on window resize
    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="w-fit flex justify-center items-center flex-col">
      <div
        ref={viewerRef}
        style={{
          width: "300px",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        className="flex justify-center items-center m-4"
      >
        <Spline scene="https://prod.spline.design/XrfB51whJVe0Ydrg/scene.splinecode" />

        {/* <iframe
          // src="https://my.spline.design/roomgirlworkingcopy-14671f04f3a833fb464a00b429ac22f9/"
          src="https://my.spline.design/molang3dcopy-1f21cc12185aa5e0517e4cd0dea3a971/"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe> */}
      </div>
      <p className="w-full text-center font-bold my-2 ">
        Your personalised avatar
      </p>
    </section>
  );
};

export default SplineViewer;
