require('dotenv').config();
const express = require('express');
const cors = require('cors');
const excelFile = require('read-excel-file/node');
const lodash = require('lodash');
const notFound = require('./routes/notFound');
const connect = require('./db/db');
const DataModel = require('./model/DataModel');

const PORT = process.env.PORT || 3050;
const app = express();

let originalExcelData;
let recordsArray = [];
let propsArray = [];
let collection = [];

app.use(cors());
app.use(express.json());

const createCollection = (data) => {
	data.forEach((record) => {
		const document = lodash.zipObject(propsArray, record);
		collection.push(document);
	});
};

const transformData = (data) => {
	const excelDataCopy = [...data];
	propsArray = excelDataCopy.shift();
	recordsArray = excelDataCopy;
	createCollection(recordsArray);
};

// routes
app.get('/', (req, res) => {
	res.json({ collection });
});

app.use(notFound);

// connect to db, start server, shape data from excel
const start = async () => {
	try {
		await connect(process.env.MONGO_URI)
			.then(
				excelFile('./data/data.xlsx').then((rows) => {
					originalExcelData = rows;
					transformData(originalExcelData);
				})
			)
			.catch((error) => console.log(error.message));
		DataModel.insertMany(collection)
			.then(() => {
				console.log('collections inserted ...');
			})
			.catch((error) => console.log(error.message));
		app.listen(PORT, console.log(`Server is listening on port: ${PORT} ...`));
	} catch (err) {
		console.error(err);
	}
};

start();
