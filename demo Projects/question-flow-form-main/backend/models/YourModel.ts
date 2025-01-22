import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
  // Define your schema fields here
  name: { type: String, required: true },
  description: String,
  // ...other fields
}, {
  timestamps: true
});

export const YourModel = mongoose.model('YourModel', yourSchema); 