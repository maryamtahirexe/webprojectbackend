import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  isRented: { type: Boolean, default: false },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
