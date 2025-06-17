
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, "data", "products.json");

app.use(cors());
app.use(express.json());

const readProducts = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeProducts = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.send("API is running!");
});

// get all products
app.get("/api/products", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error reading products data" });
  }
});

// get product by id
app.get("/api/products/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((s) => s.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

// add a new product
app.post("/api/product", (req, res) => {
    const products = readProducts();
    const newProduct = {...req.body, id: Date.now()};
    products.push(newProduct);
    writeStudents(products);
    res.status(201).json(newProduct);
});

// update an existing product
app.put("/api/products/:id", (req, res) => {
    let products = readProducts();
    const id = parseInt(req.params.id);
    products = products.map((s) => (s.id === id ? { ...s, ...req.body } : s));
    writeProducts(products);
    res.json({ message: "Product updated successfully" });
});

// delete a product
app.delete("/api/products/:id", (req, res) => {
    let products = readProducts();
    products = products.filter(s => s.id !== parseInt(req.params.id));
    writeProducts(products);
    res.json({ message: "Product deleted successfully" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});