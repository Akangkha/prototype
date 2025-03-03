"use client";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import BodyTypeCalculator from "./BodyTypeCalculator";
import SkinColorPicker from "./SkinColorPicker";
import ColorPalette from "./ColorPalette";
const Customisation = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);
  const [colorPalette, setColorPalette] = useState();
  const handleNext = () => {
    console.log(step, "step");
    if (step === 3) {
      window.location.href = "/personalisation";
      setOpen(false);
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Modal open={open}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg h-[80vh] w-[70vw] ">
          {step === 1 && <BodyTypeCalculator onNext={handleNext} />}
          {step === 2 && (
            <SkinColorPicker
              onBack={handleBack}
              onNext={handleNext}
              setColorPalette={setColorPalette}
            />
          )}
          {step === 3 && (
            <ColorPalette
              colorPalette={colorPalette}
              onBack={handleBack}
              handleNext={handleNext}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Customisation;
