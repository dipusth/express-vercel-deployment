const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint
app.get("/api/products", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "products.json"));
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server with better error handling
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);

  // Verify files exist
  const publicPath = path.join(__dirname, "public");
  const htmlPath = path.join(publicPath, "index.html");
  const jsonPath = path.join(__dirname, "products.json");

  console.log("\nFile verification:");
  console.log(
    "- public directory:",
    fs.existsSync(publicPath) ? "✅ Found" : "❌ Missing"
  );
  console.log(
    "- index.html:",
    fs.existsSync(htmlPath) ? "✅ Found" : "❌ Missing"
  );
  console.log(
    "- products.json:",
    fs.existsSync(jsonPath) ? "✅ Found" : "❌ Missing"
  );

  if (!fs.existsSync(htmlPath)) {
    console.error("\nERROR: index.html not found in /public directory");
    console.log("Solution: Create a public folder with index.html");
  }
});
