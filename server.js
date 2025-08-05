const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 8080;
const productsPath = path.join(__dirname, "product.json");
// Enable CORS for all routes (if your frontend is on a different port)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel");
});

// API endpoint to get products
// app.get("/api/products", (req, res) => {
//   try {
//     const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
//     res.json(products);
//   } catch (error) {
//     console.error("Error reading product.json:", error);
//     res.status(500).json({
//       error: "Failed to load products",
//       details: error.message,
//     });
//   }
// });

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, title: "Test Product" },
    // ... other test products
  ]);
});

app.get("/debug", (req, res) => {
  const fileExists = fs.existsSync(path.join(__dirname, "product.json"));
  res.json({
    fileExists,
    currentDir: __dirname,
    filesInDir: fs.readdirSync(__dirname),
  });
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
