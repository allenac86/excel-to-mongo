require('dotenv').config();
const mongoose = require('mongoose');

const DataModel = new mongoose.Schema({
	title: {
		type: String,
		required: [true, `must provide title`],
		trim: true,
		maxlength: [100, 'title can not be more than 100 characters long'],
	},
	author: {
		type: String,
		required: [true, `must provide author`],
		trim: true,
		maxlength: [30, 'author can not be more than 30 characters long'],
	},
	yearPublished: {
		type: Number,
		required: [true, `must provide year published`],
	},
	isRead: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model('Book', DataModel);
