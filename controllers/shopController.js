import Shop from "../models/Shop.js";  
import Tenant from "../models/Tenant.js";  

export const createShop = async (req, res) => {
  try {
    const { name, location, tenant } = req.body;

    const isRented = tenant ? true : false;

    let tenantExists = null;
    if (tenant) {
      tenantExists = await Tenant.findById(tenant);
      if (!tenantExists) {
        return res.status(400).json({ message: "Tenant not found" });
      }
    }

    const shop = new Shop({
      name,
      location,
      isRented,
      tenant: tenantExists ? tenant : null,
    });

    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("tenant");
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId).populate("tenant");
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShop = async (req, res) => {
  try {
    const { name, location, tenant } = req.body;

    const isRented = tenant ? true : false;

    let tenantExists = null;
    if (tenant) {
      tenantExists = await Tenant.findById(tenant);
      if (!tenantExists) {
        return res.status(400).json({ message: "Tenant not found" });
      }
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.shopId,
      { name, location, isRented, tenant: tenantExists ? tenant : null },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShop = async (req, res) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.shopId);
    if (!deletedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
