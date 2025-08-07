import express from "express";
import { createShop, getAllShops, getShopById, updateShop, deleteShop } from "../controllers/shopController.js";

const router = express.Router();

router.post("/", createShop);
router.get("/", getAllShops);
router.get("/:shopId", getShopById);
router.patch("/:shopId", updateShop);
router.delete("/:shopId", deleteShop);

export default router;
