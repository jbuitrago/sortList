var mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  description: String,
  image: String
});

module.exports = Item = mongoose.model('items', ItemSchema);
