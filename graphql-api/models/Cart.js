const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String
  },
  products: [
    {
      product: {
        type: Array
      },
      productTotal: {
        type: String
      }
    }
  ],
  total: {
    type: String
  }
});

module.exports = mongoose.model('Cart', cartSchema);