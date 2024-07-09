// scripts/loadData.js

const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const MONGODB_URI =
  "mongodb+srv://akangkhasarkar:akangkha@cluster0.mepyygn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

const Item = mongoose.model("Item", ItemSchema);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const loadData = async () => {
  const items = [];
  fs.createReadStream(path.join(__dirname, "../data/womenStore.csv"))
    .pipe(csv())
    .on("data", (row) => {
      items.push(row);
    })
    .on("end", async () => {
      await Item.insertMany(items);
      console.log("Data successfully loaded");
      mongoose.disconnect();
    });
};

loadData();
