var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imagePath:{'type':'string','required':'true'},
	title:{'type':'string','required':'true'},
	description:{'type':'string','required':'true'},
	price:{'type':'number','required':'true'}
});

module.exports = mongoose.model('product',schema);