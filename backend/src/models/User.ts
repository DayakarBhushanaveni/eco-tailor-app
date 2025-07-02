import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  measurements: String,
  savedDesigns: [String],
  sustainabilityScore: Number,
  rewards: Number
});

export default model("User", UserSchema);