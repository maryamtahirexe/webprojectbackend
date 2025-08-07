import Request from "../models/Request.js";
import Owner from "../models/Owner.js";
import Apartment from "../models/Apartment.js";
import Shop from "../models/Shop.js";
import Payment from "../models/Payment.js";

export const signInOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (owner.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Sign-in successful",
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing in owner", error: error.message });
  }
};


export const createOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    const owner = new Owner({ email, password });
    await owner.save();

    res.status(201).json({ message: "Owner created successfully", owner });
  } catch (error) {
    res.status(500).json({ message: "Error creating owner", error: error.message });
  }
};

export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findOne();
    if (!owners) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching owners", error: error.message });
  }
};

export const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findById(id).populate("properties");
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching owner", error: error.message });
  }
};

export const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const owner = await Owner.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner updated successfully", owner });
  } catch (error) {
    res.status(500).json({ message: "Error updating owner", error: error.message });
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByIdAndDelete(id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting owner", error: error.message });
  }
};

export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate("owner tenant");
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartments", error: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("owner tenant");
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops", error: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("tenant owner property");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};

export const getPaymentDetails = async (req, res) => {
  try {
    const payments = await Payment.find().populate("tenant owner property");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};


