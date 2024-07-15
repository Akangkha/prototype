import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Image from "next/image";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const ColorPalette = ({ colorPalette, onBack, handleNext }) => {
  const renderColors = (colors) => {
    return colors.map((color, index) => (
      <div
        key={index}
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
    ));
  };

  return (
    colorPalette && (
      <div className="flex flex-wrap items-center p-8 space-y-8 relative">
        <div className="p-8 max-w-md mx-auto bg-white shadow-md space-y-4">
          <h2 className="text-2xl font-bold">Primary Colors</h2>
          <p>These are the main part of the outfit.</p>
          <div className="flex space-x-4">
            {renderColors(colorPalette?.primary)}
          </div>
        </div>
        <div className="p-8 max-w-md mx-auto bg-white shadow-md space-y-4">
          <h2 className="text-2xl font-bold">Accent Colors</h2>
          <p>These colors add a pop to the outfit.</p>
          <div className="flex space-x-4">
            {renderColors(colorPalette?.accent)}
          </div>
        </div>
        <div className="p-8 max-w-md mx-auto bg-white shadow-md space-y-4">
          <h2 className="text-2xl font-bold">Neutral Colors</h2>
          <p>These colors complement the outfit.</p>
          <div className="flex space-x-4">
            {renderColors(colorPalette?.neutral)}
          </div>
        </div>
        <ArrowCircleLeftIcon
          onClick={onBack}
          className="cursor-pointer absolute right-16 bottom-2"
          fontSize="large"
        />
        <ArrowCircleRightIcon
          onClick={() => {
            if (handleNext) {
              handleNext();
            } else {
              console.error("handleNext is not defined or is not a function");
            }
          }}
          className="cursor-pointer absolute bottom-2 right-6"
          fontSize="large"
        />
      </div>
    )
  );
};

export default ColorPalette;
