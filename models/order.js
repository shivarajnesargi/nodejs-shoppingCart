var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	user:{'type':Schema.Types.ObjectId,ref:'User','required':true},
	name:{'type':'string','required':true},
	address:{'type':'string','required':true},
	cart:{'type':Object,'required':true},
	paymentId:{'type':'string','required':true}
});

module.exports = mongoose.model('Order',schema);