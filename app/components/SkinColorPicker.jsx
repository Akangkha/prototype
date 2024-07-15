"use client";
import { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Image from "next/image";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { generatePalette } from "@/api/recommendation";
const SkinColorPicker = ({ onBack, onNext, setColorPalette }) => {
  const [skinColor, setSkinColor] = useState("#FFDFC4");
  const skinTones = {
    "Very Light Skin": "#FFDFC4",
    "Light Skin": "#F0D5BE",
    "Light-Medium Skin": "#E1B899",
    "Medium Skin": "#D6A77A",
    "Medium-Tan Skin": "#B08D57",
    "Tan Skin": "#A67B5B",
    "Dark Tan Skin": "#8D5A2F",
    "Dark Skin": "#6D4C41",
    "Deep Dark Skin": "#3C2C1F",
  };

  const handleSubmit = () => {
 
    generatePalette(skinColor, false)
      .then((res) => {
        console.log("Generated palette:", res);
        setColorPalette(res);
      })
      .catch((err) => {
        console.error("Failed to generate palette:", err);
      });
  };
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex justify-between p-8 items-center relative ">
      <div className="p-8 max-w-md mx-auto bg-white  space-y-4">
        <h1 className="text-2xl font-bold ">Skin Color Picker</h1>
        <div className="mb-4">
          <label className="block text-gray-700">
            Pick Skin Color:
            <input
              type="color"
              className="mt-1 block w-full border border-gray-300 rounded"
              value={skinColor}
              onChange={(e) => setSkinColor(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Or choose a preset skin tone:
          </label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {Object.entries(skinTones).map(([name, color]) => (
              <div
                key={name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setSkinColor(color)}
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm mt-1">{name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-[#e5a378] text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full items-end">
        <Image
          src="/images/skincolor.avif"
          alt="body type"
          width={500}
          height={500}
        />
      </div>
      <ArrowCircleLeftIcon
        onClick={onBack}
        className="cursor-pointer absolute right-16 bottom-6"
        fontSize="large"
      />
      <ArrowCircleRightIcon
        onClick={handleNext}
        className="cursor-pointer absolute bottom-6 right-6"
        fontSize="large"
      />
    </div>
  );
};

export default SkinColorPicker;
