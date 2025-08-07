import Apartment from "../models/Apartment.js";
import Tenant from "../models/Tenant.js";

export const createApartment = async (req, res) => {
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
    const newApartment = new Apartment({
      name,
      location,
      isRented,
      tenant: tenantExists ? tenant : null,
    });

    await newApartment.save();

    res.status(201).json({ message: "Apartment created successfully", apartment: newApartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate("tenant");
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id).populate("tenant");
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApartment = async (req, res) => {
  try {
    const { tenant, name, location } = req.body;

    const isRented = tenant ? true : false;

    if (tenant) {
      const existingTenant = await Tenant.findById(tenant);
      if (!existingTenant) {
        return res.status(404).json({ message: "Tenant not found" });
      }
    }

    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { tenant, isRented, name, location },  
      { new: true }
    ).populate("tenant");

    if (!updatedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json({ message: "Apartment updated successfully", apartment: updatedApartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApartmentsByTenant = async (req, res) => {
  try {
    const apartments = await Apartment.find({ tenant: req.params.tenantId });
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


