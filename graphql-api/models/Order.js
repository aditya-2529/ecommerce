const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  status: {
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);