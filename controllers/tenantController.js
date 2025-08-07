import Tenant from "../models/Tenant.js";
import Payment from "../models/Payment.js";
import Request from "../models/Request.js";

export const createTenant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newTenant = new Tenant({ name, email, password });
    await newTenant.save();
    res.status(201).json({ message: "Tenant created successfully", tenant: newTenant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate("rentedProperties");
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate("rentedProperties");
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTenant = async (req, res) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json({ message: "Tenant updated successfully", tenant: updatedTenant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTenant = async (req, res) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTenantPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ tenant: req.params.id }).populate("property owner");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTenantRequests = async (req, res) => {
  try {
    const requests = await Request.find({ tenant: req.params.id }).populate("property owner");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


