import express from "express";
import {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
  getTenantPayments,
  getTenantRequests,
} from "../controllers/tenantController.js";

const router = express.Router();

router.post("/", createTenant);            
router.get("/", getAllTenants);            
router.get("/:id", getTenantById);         
router.put("/:id", updateTenant);          
router.delete("/:id", deleteTenant); 
router.get("/:id/payments", getTenantPayments);  
router.get("/:id/requests", getTenantRequests);  

export default router;

