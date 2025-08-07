import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rentedProperties: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" },
    { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }
  ]
});

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
