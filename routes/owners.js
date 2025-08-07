import express from "express";
import { 
    createOwner, 
    getAllOwners, 
    getOwnerById, 
    updateOwner, 
    deleteOwner, 
    getAllApartments, 
    getAllShops, 
    getAllRequests, 
    getPaymentDetails,
    signInOwner,
  } from "../controllers/ownerController.js";
  
  const router = express.Router();
  
  router.post("/", createOwner);
  router.post("/signin", signInOwner);
  router.get("/", getAllOwners);
  router.get("/:id", getOwnerById);
  router.put("/:id", updateOwner);
  router.delete("/:id", deleteOwner);
  router.get("/:id/apartments", getAllApartments); 
  router.get("/:id/shops", getAllShops);           
  router.get("/:id/requests", getAllRequests);     
  router.get("/:id/payments", getPaymentDetails);  
  
 export default router;