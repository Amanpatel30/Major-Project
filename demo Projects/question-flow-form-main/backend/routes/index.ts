import express from 'express';
import { YourModel } from '../models/YourModel';

const router = express.Router();

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await YourModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new item
router.post('/items', async (req, res) => {
  try {
    const newItem = new YourModel(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 