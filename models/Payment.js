import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  bankAccountNumber: { type: String, required: true },
  message: { type: String, required: true } 
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;