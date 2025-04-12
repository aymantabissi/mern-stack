// controllers/aiController.js
import axios from "axios";

export const getRecommendations = async (req, res) => {
  const { product_id } = req.body;

  try {
    const response = await axios.post("http://localhost:5001/recommendations", { product_id });
    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with Flask:", error.message);
    res.status(500).json({ message: "Error getting recommendations from AI service" });
  }
};


