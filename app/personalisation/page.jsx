import React from "react";
import SplineViewer from "@/app/components/AvatarViewer";
import Store from "@/app/components/Store";
import App from "../components/3dViewer";
const page = () => {
  return (
    <div className="flex gap-2">
     
      <App />
      <Store />
       <SplineViewer/>
    </div>
  );
};

export default page;
