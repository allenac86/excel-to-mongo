require('dotenv').config();
const mongoose = require('mongoose');

const DataModel = new mongoose.Schema({
	[process.env.PROP_ONE]: {
		type: String,
		required: [true, `must provide ${process.env.PROP_ONE}`],
		trim: true,
		maxlength: [100, 'title can not be more than 100 characters long'],
	},
	[process.env.PROP_TWO]: {
		type: String,
		required: [true, `must provide ${process.env.PROP_TWO}`],
		trim: true,
		maxlength: [30, 'author can not be more than 30 characters long'],
	},
	[process.env.PROP_THREE]: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model(process.env.MODEL_NAME, DataModel);
