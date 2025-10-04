import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Get all contacts
router.get("/", async (req, res) => {
  const { q } = req.query; // search query
  const query = q ? { name: new RegExp(q, "i") } : {};
  const contacts = await Contact.find(query);
  res.json(contacts);
});

// Add contact
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit contact
router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

export default router;
