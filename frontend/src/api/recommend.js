export const getRecommendations = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });
  
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      return await res.json();
    } catch (err) {
      console.error("Recommendation error:", err);
      return [];
    }
  };