const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: Array,
    required: true
  },
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Cart', cartSchema);