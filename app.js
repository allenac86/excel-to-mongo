require('dotenv').config();
const connect = require('./db/db');
const excelFile = require('read-excel-file/node');
const lodash = require('lodash');
const DataModel = require('./model/DataModel');
const { Mongoose, connection } = require('mongoose');

let recordsArray = [];
let propsArray = [];
let collection = [];

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

	console.log("File converted ...");
};

const start = async () => {

	try {
		await connect(process.env.MONGO_URI)
			.then(convertExcelToMongoCollection(process.env.FILE_PATH))
			.catch((error) => console.log(error.message));

		DataModel.insertMany(collection)
			.then(() => {
				console.log('Collections inserted ...');
			})
			.then(() => {
				console.log("Operation complete ...");
			})
			.catch((error) => console.log(error.message))
			.finally(() => {
				connection.close(false, () => {
					console.log("Database connection closed");
					process.exit(0);
				});
			});
	} catch (err) {
		console.error(err);
	}

};

start();
