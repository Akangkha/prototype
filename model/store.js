// models/Item.js

import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  name: String,
  current_price: Number,
  raw_price: Number,
  currency: String,
  discount: Number,
  likes_count: Number,
  is_new: Boolean,
  brand: String,
  brand_url: String,
  codCountry: String,
  variation_0_color: String,
  variation_1_color: String,
  variation_0_thumbnail: String,
  variation_0_image: String,
  variation_1_thumbnail: String,
  variation_1_image: String,
  image_url: String,
  url: String,
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);

export default Item;