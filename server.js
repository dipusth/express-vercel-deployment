const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Home route - Add this handler
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Working code ibnitially
// app.get("/api/products", (req, res) => {
//   res.json([
//     { id: 1, title: "Test Product" },
//     // ... other test products
//   ]);
// });
// Products endpoint - Final version
app.get("/api/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");

  // 1. Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error("Error: product.json not found at", filePath);
    return res.status(404).json({
      error: "product.json not found",
      solution: "Please ensure the file exists in your server directory",
    });
  }

  try {
    // 2. Read and parse the file
    const rawData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(rawData);

    // 3. Validate it's an array
    if (!Array.isArray(products)) {
      throw new Error("product.json should contain an array of products");
    }

    // 4. Return the actual products
    return res.json(products);
  } catch (error) {
    console.error("Failed to load products:", error);
    return res.status(500).json({
      error: "Failed to process product.json",
      details: error.message,
      solution: "Please validate your JSON file at jsonlint.com",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Access your products at http://localhost:${port}/api/products`);
});
