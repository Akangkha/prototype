// scripts/loadProducts.js

const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const ProductSchema = new mongoose.Schema({
  p_id: { type: String },
  name: { type: String },
  price: { type: Number },
  colour: { type: String },
  brand: { type: String },
  img: { type: String },
  ratingCount: { type: Number },
  avg_rating: { type: Number },
  description: { type: String },
  p_attributes: { type: Map, of: String }, // Flexible object
});

const Product = mongoose.model("Product", ProductSchema);

const MONGODB_URI =
  "mongodb+srv://akangkhasarkar:akangkha@cluster0.mepyygn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

const loadProducts = async () => {
  const products = [];
  fs.createReadStream(path.join(__dirname, "../data/myntraStore.csv"))
    .pipe(csv())
    .on("data", (row) => {
      // Parse p_attributes as JSON
      if (row.p_attributes) {
        try {
          row.p_attributes = JSON.parse(row.p_attributes);
        } catch (error) {
          console.error("Error parsing p_attributes:", error);
        }
      }
      products.push(row);
    })
    .on("end", async () => {
      try {
        await Product.insertMany(products);
        console.log("Data successfully loaded");
      } catch (error) {
        console.error("Error inserting data:", error.message);
      } finally {
        mongoose.disconnect();
      }
    });
};

loadProducts();
