import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  isRented: { type: Boolean, default: false },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: false, },
});

const Apartment = mongoose.model("Apartment", apartmentSchema);
export default Apartment;