"use client";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Image from "next/image";
const BodyTypeCalculator = ({ onNext }) => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [highHip, setHighHip] = useState("");
  const [hips, setHips] = useState("");
  const [unit, setUnit] = useState("inches");

  const handleNext = () => {
    onNext();
  };

  const [bodyType, setBodyType] = useState("");

  const convertToInches = (value) => (unit === "cm" ? value / 2.54 : value);

  const calculateBodyType = () => {
    const bustNum = convertToInches(parseFloat(bust));
    const waistNum = convertToInches(parseFloat(waist));
    const highHipNum = convertToInches(parseFloat(highHip));
    const hipsNum = convertToInches(parseFloat(hips));

    if (
      (bustNum - hipsNum <= 1 &&
        hipsNum - bustNum < 3.6 &&
        bustNum - waistNum >= 9) ||
      hipsNum - waistNum >= 10
    ) {
      setBodyType("Hourglass");
    } else if (
      hipsNum - bustNum >= 3.6 &&
      hipsNum - bustNum < 10 &&
      hipsNum - waistNum >= 9 &&
      highHipNum / waistNum < 1.193
    ) {
      setBodyType("Bottom Hourglass");
    } else if (
      bustNum - hipsNum > 1 &&
      bustNum - hipsNum < 10 &&
      bustNum - waistNum >= 9
    ) {
      setBodyType("Top Hourglass");
    } else if (
      hipsNum - bustNum > 2 &&
      hipsNum - waistNum >= 7 &&
      highHipNum / waistNum >= 1.193
    ) {
      setBodyType("Spoon");
    } else if (hipsNum - bustNum >= 3.6 && hipsNum - waistNum < 9) {
      setBodyType("Triangle");
    } else if (bustNum - hipsNum >= 3.6 && bustNum - waistNum < 9) {
      setBodyType("Inverted Triangle");
    } else if (
      hipsNum - bustNum < 3.6 &&
      bustNum - hipsNum < 3.6 &&
      bustNum - waistNum < 9 &&
      hipsNum - waistNum < 10
    ) {
      setBodyType("Rectangle");
    } else {
      setBodyType("Undefined");
    }
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
            <p className="text-lg font-bold">Your body type is: {bodyType}</p>
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
