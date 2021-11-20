const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'must provide title'],
		trim: true,
		maxlength: [100, 'title can not be more than 100 characters long'],
	},
	author: {
		type: String,
		required: [true, 'must provide author'],
		trim: true,
		maxlength: [30, 'author can not be more than 30 characters long'],
	},
	series: {
		type: String,
	},
	numInSeries: {
		type: Number,
	},
	isRead: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model('Book', BookSchema);
