import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  message: { type: String, required: true },  
  status: { type: String, required: true, default: 'Pending' },  
  type: { type: String, required: true }, 
  date: { type: Date, default: Date.now },  
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
