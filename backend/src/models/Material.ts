import { Schema, model } from "mongoose";

const MaterialSchema = new Schema({
  name: String,
  type: String,
  description: String,
  impactScore: String,
  priceCategory: String,
  source: String,
  image: String
});

export default model("Material", MaterialSchema);