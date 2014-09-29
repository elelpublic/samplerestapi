var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
  name: String,
  author: String,
  year: Number,
  synopsis: String,
  publisher: String
});

module.exports = mongoose.model('Book', BookSchema);

