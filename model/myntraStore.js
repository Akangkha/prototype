// models/Product.js
const mongoose = require("mongoose");

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

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
