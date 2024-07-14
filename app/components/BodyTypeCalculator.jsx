"use client";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";
import { sendMeasurements } from "@/api/recommendation";
const BodyTypeCalculator = ({ onNext }) => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [highHip, setHighHip] = useState("");
  const [hips, setHips] = useState("");
  const [unit, setUnit] = useState("inches");

  const [bodyType, setBodyType] = useState("");
  const [upperWearSize, setUpperWearSize] = useState("");
  const [bottomWearSize, setBottomWearSize] = useState("");

  const handleNext = () => {
    onNext();
  };

  const convertToInches = (value) => (unit === "cm" ? value / 2.54 : value);

  const calculateBodyType = () => {
    const bustNum = convertToInches(parseFloat(bust));
    const waistNum = convertToInches(parseFloat(waist));
    const highHipNum = convertToInches(parseFloat(highHip));
    const hipsNum = convertToInches(parseFloat(hips));

    let calculatedBodyType = "";
    if (
      (bustNum - hipsNum <= 1 &&
        hipsNum - bustNum < 3.6 &&
        bustNum - waistNum >= 9) ||
      hipsNum - waistNum >= 10
    ) {
      calculatedBodyType = "Hourglass";
    } else if (
      hipsNum - bustNum >= 3.6 &&
      hipsNum - bustNum < 10 &&
      hipsNum - waistNum >= 9 &&
      highHipNum / waistNum < 1.193
    ) {
      calculatedBodyType = "Bottom Hourglass";
    } else if (
      bustNum - hipsNum > 1 &&
      bustNum - hipsNum < 10 &&
      bustNum - waistNum >= 9
    ) {
      calculatedBodyType = "Top Hourglass";
    } else if (
      hipsNum - bustNum > 2 &&
      hipsNum - waistNum >= 7 &&
      highHipNum / waistNum >= 1.193
    ) {
      calculatedBodyType = "Spoon";
    } else if (hipsNum - bustNum >= 3.6 && hipsNum - waistNum < 9) {
      calculatedBodyType = "Triangle";
    } else if (bustNum - hipsNum >= 3.6 && bustNum - waistNum < 9) {
      calculatedBodyType = "Inverted Triangle";
    } else if (
      hipsNum - bustNum < 3.6 &&
      bustNum - hipsNum < 3.6 &&
      bustNum - waistNum < 9 &&
      hipsNum - waistNum < 10
    ) {
      calculatedBodyType = "Rectangle";
    } else {
      calculatedBodyType = "Undefined";
    }
    setBodyType(calculatedBodyType);

    const upperWearSize = getUpperWearSize(bustNum);
    const bottomWearSize = getBottomWearSize(waistNum, hipsNum);

    setUpperWearSize(upperWearSize);
    setBottomWearSize(bottomWearSize);

     const measurements = {
      bust: bustNum,
      waist: waistNum,
      highHip: highHipNum,
      hips: hipsNum,
      bodyType: calculatedBodyType,
      upperWearSize: upperWearSize,
      bottomWearSize: bottomWearSize,
    };

    sendMeasurements(measurements);
  };

  const calculateClothingSize = (bustNum, waistNum, hipsNum) => {
    const upperWearSize = getUpperWearSize(bustNum);
    const bottomWearSize = getBottomWearSize(waistNum, hipsNum);

    setUpperWearSize(upperWearSize);
    setBottomWearSize(bottomWearSize);
  };

  const getUpperWearSize = (bust) => {
    if (bust <= 32) return "XS";
    if (bust <= 34) return "S";
    if (bust <= 36) return "M";
    if (bust <= 38) return "L";
    if (bust <= 40) return "XL";
    return "XXL";
  };

  const getBottomWearSize = (waist, hips) => {
    if (waist <= 26 && hips <= 36) return "XS";
    if (waist <= 28 && hips <= 38) return "S";
    if (waist <= 30 && hips <= 40) return "M";
    if (waist <= 32 && hips <= 42) return "L";
    if (waist <= 34 && hips <= 44) return "XL";
    return "XXL";
  };

  return (
    <div className="flex justify-between p-8 items-center relative h-full">
      <div className="max-w-md rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Body Type Calculator</h1>
        <div className="mb-4">
          <label className="block text-gray-700">
            <select
              className="mt-1 block w-full border border-gray-300 rounded"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="inches" className="border-gray-600">
                Inches
              </option>
              <option value="cm">Centimeters</option>
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Bust size:
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded"
              value={bust}
              onChange={(e) => setBust(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Waist size:
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            High hip size:
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded"
              value={highHip}
              onChange={(e) => setHighHip(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Hip size:
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded"
              value={hips}
              onChange={(e) => setHips(e.target.value)}
            />
          </label>
        </div>
        <button
          className="bg-[#e5a378] text-white font-bold py-2 px-4 rounded"
          onClick={calculateBodyType}
        >
          Find my body type
        </button>
        {bodyType && (
          <div className="mt-4">
            <p className="font-bold">Your body type is: {bodyType}</p>
            <p className="font-bold">Upper wear size: {upperWearSize}</p>
            <p className="font-bold">Bottom wear size: {bottomWearSize}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center h-full items-end">
        <Image
          src="/videos/bodytype.gif"
          alt="body type"
          width={500}
          height={500}
        />
      </div>
      <ArrowCircleRightIcon
        onClick={handleNext}
        className="cursor-pointer absolute bottom-6 right-6"
        fontSize="large"
      />
    </div>
  );
};

export default BodyTypeCalculator;
