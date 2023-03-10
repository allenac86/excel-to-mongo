require('dotenv').config();
const connect = require('./db/db');
const excelFile = require('read-excel-file/node');
const _ = require('lodash');
const DataModel = require('./model/DataModel');
const { connection } = require('mongoose');

let columnHeadingList = [];
let rowDataList = [];

const separateColumnHeadingsFromRowData = (excelData) => {
	const excelDataArray = [...excelData];

	columnHeadingList = excelDataArray.shift();

	return excelDataArray;
};

const createRowDataList = (rowDataArray) => {
	rowDataArray.forEach((record) => {
		const document = _.zipObject(columnHeadingList, record);

		rowDataList.push(document);
	});
};

const convertExcelToMongoCollection = (path) => {
	let originalExcelData;

	excelFile(path)
		.then((rows) => {
			originalExcelData = rows;
			createRowDataList(separateColumnHeadingsFromRowData(originalExcelData));
		})
		.catch((error) => console.log(error));

	console.log('File converted ...');
};

const start = async () => {
	try {
		await connect(process.env.MONGO_URI)
			.then(convertExcelToMongoCollection(process.env.FILE_PATH))
			.catch((error) => console.log(error.message));

		DataModel.insertMany(rowDataList)
			.then(() => {
				console.log('Collections inserted ...');
			})
			.then(() => {
				console.log('Operation complete ...');
			})
			.catch((error) => console.log(error.message))
			.finally(() => {
				connection.close(false, () => {
					console.log('Database connection closed');
					process.exit(0);
				});
			});
	} catch (err) {
		console.error(err);
	}
};

start();
