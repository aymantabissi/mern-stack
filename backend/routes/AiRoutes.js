import express from 'express';
const router = express.Router();

// Example AI-related route
router.post("/recommend", async (req, res) => {
  try {
    // Your AI functionality (e.g., calling Flask API)
    res.json({ success: true, message: "Recommendations fetched" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching recommendations" });
  }
});

export default router;
