// backend/controllers/contactController.js
const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  console.log('getContact');
  
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
