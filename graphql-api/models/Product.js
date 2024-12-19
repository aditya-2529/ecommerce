const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
      type: String,
      required: true
  },
  stock: {
      type: Number,
  },
  imageUrl: {
      type: String
  }
});

module.exports = mongoose.model('Product', productSchema);