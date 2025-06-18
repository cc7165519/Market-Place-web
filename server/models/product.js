const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  playerType: {
    type: String,
    default: '',
    trim: true,
  },
  material: {
    type: String,
    default: '',
    trim: true,
  },
  level: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', productSchema);