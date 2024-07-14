export const sendMeasurements = async (measurements) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/measurements'", {
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