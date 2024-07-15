export const sendMeasurements = async (measurements) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/measurements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(measurements),
    });

    if (!response.ok) {
      throw new Error("Failed to send measurements to API");
    }

    const data = await response.json();
    console.log("API response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const generatePalette = async (skinColor, coolUndertone) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/generate_palette", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skin_color: skinColor,
        cool_undertone: coolUndertone,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate palette");
    }

    const data = await response.json();
    console.log("Generated palette:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
