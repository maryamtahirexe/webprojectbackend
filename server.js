import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ownerRouter from "./routes/owners.js";
import apartmentRouter from "./routes/apartments.js";  
import tenantRouter from "./routes/tenants.js";        
import paymentRouter from "./routes/payments.js";      
import requestRouter from "./routes/requests.js";     
import shopRouter from "./routes/shops.js";  

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000","https://webproject-yb66.vercel.app"],
    credentials: true,
  })
);
 
app.use("/owner", ownerRouter);
app.use("/apartments", apartmentRouter);  
app.use("/tenants", tenantRouter);        
app.use("/payments", paymentRouter);      
app.use("/requests", requestRouter);      
app.use("/shops", shopRouter); 

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

console.log("CONNECTION_URL:", process.env.CONNECTION_URL);

if (!CONNECTION_URL) {
  console.error("CONNECTION_URL is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, async () => {
      console.log(`Server Running on port ${PORT}`);
    })
  )
  .catch((error) => console.error("Database connection error:", error.message));
//mongodb+srv://maryamtahir061:meenuu123@clusterweb.l6zg4.mongodb.net/
