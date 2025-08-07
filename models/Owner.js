import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Apartment" }, { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }]
});

const Owner = mongoose.model("Owner", ownerSchema);
export default Owner;
