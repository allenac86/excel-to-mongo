require('dotenv').config();
const express = require('express');
const cors = require('cors');
const excelFile = require('read-excel-file/node');
const lodash = require('lodash');
const notFound = require('./routes/notFound');
const connect = require('./db/db');
const BookModel = require('./BookModel');

const PORT = process.env.PORT || 3050;
const app = express();
let originalExcelData;
let objValuesArr = [];
let finalObjectArr = [];

app.use(cors());
app.use(express.json());

const shapeExcelData = (data) => {
	const excelDataCopy = [...data];
	excelDataCopy.shift();
	objValuesArr = excelDataCopy;
};

const transformData = () => {
	objValuesArr.forEach((array) => {
		const book = lodash.zipObject();
		finalObjectArr.push(book);
	});
};

// routes
app.get('/', async (req, res) => {
	res.json({ msg: 'hello' });
});

app.use(notFound);

// connect to db, start server, shape data from excel
const start = async () => {
	try {
		await connect(process.env.MONGO_URI);
		excelFile('./books.xlsx').then((rows) => {
			originalExcelData = rows;
			shapeExcelData(originalExcelData);
			transformData();
		});

		app.listen(PORT, console.log(`Server is listening on port: ${PORT} ...`));
	} catch (err) {
		console.error(err);
	}
};

start();
