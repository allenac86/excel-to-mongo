require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('./routes/notFound');
const connect = require('./db/db');
const excelFile = require('read-excel-file/node');
const lodash = require('lodash');
const DataModel = require('./model/DataModel');

const PORT = process.env.PORT || 3050;
const app = express();

let recordsArray = [];
let propsArray = [];
let collection = [];

app.use(cors());
app.use(express.json());

const massageData = (excelData) => {
	const excelDataCopy = [...excelData];

	propsArray = excelDataCopy.shift();
	recordsArray = excelDataCopy;
	return recordsArray;
};

const createCollection = (rowDataArray) => {
	rowDataArray.forEach((record) => {
		const document = lodash.zipObject(propsArray, record);

		collection.push(document);
	});
};

const convertExcelToMongoCollection = (path) => {
	let originalExcelData;

	excelFile(path)
		.then((rows) => {
			originalExcelData = rows;
			createCollection(massageData(originalExcelData));
		})
		.catch((error) => console.log(error));
};

// routes
app.get('/', (req, res) => {
	res.json({ collection });
});

// 404 route handler
app.use(notFound);

const start = async () => {
	const filePath = './data/data.xlsx';

	try {
		await connect(process.env.MONGO_URI)
			.then(convertExcelToMongoCollection(filePath))
			.catch((error) => console.log(error.message));

		DataModel.insertMany(collection)
			.then(() => {
				console.log('collections inserted ...');
			})
			.then(() => {
				app.listen(
					PORT,
					console.log(`Server is listening on port: ${PORT} ...`)
				);
			})
			.catch((error) => console.log(error.message));
	} catch (err) {
		console.error(err);
	}
};

start();
