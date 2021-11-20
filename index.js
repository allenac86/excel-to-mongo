require('dotenv').config();
const express = require('express');
const cors = require('cors');
const excelFile = require('read-excel-file/node');
const notFound = require('./notFound');
const connect = require('./db');
const Book = require('./Book');
const BookModel = require('./BookModel');
const PORT = process.env.PORT || 3050;
const app = express();
let originalExcelData;
let objValuesArr = [];
let finalObjectArr = [];

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.json({ msg: 'hello' });
});

app.use(notFound);

const shapeExcelData = data => {
	const excelDataCopy = [...data];
	excelDataCopy.shift();
	objValuesArr = excelDataCopy;
};

const transformData = () => {
	objValuesArr.forEach(array => {
		const book = new Book(array[0], array[1], array[2], array[3], array[4]);
		finalObjectArr.push(book);
	});
};

const start = async () => {
	try {
		await connect(process.env.MONGO_URI);
		excelFile('./books.xlsx').then(rows => {
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
