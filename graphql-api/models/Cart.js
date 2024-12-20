const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String
  },
  products: {
    type: Array
  },
  total: {
    type: String
  }
});

module.exports = mongoose.model('Cart', cartSchema);