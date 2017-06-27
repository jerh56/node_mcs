var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  price: Number
}, { collection: 'products' });

module.exports = mongoose.model('Product', schema);
