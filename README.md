# excel-to-mongo

Tool that reads an excel spreadsheet and uploads each row as a document to a mongoDB collection when the app is started. This was designed as a one-time use, so every time the app is started the collections will be added to the db. The tool only needs to be run once for each data set you want to turn into a mongoDB collection.

The excel file should be formatted with the first row being the column headings/property names and each subsequent row being a the data that will be converted to an object and saved to a mongoDB collection.

# Notes:
  - model/DataModel.js is set up to accept 3 properties for the object, 2 required strings and a boolean that defaults to true. Edit this file according to the needs of your data. It currently uses environment variables for the property names for reusability. Create a .env file with the varibles PROP_ONE="<prop name>", PROP_TWO="<prop name>", and PROP_THREE="<prop name>" to create 3 property names, or add others as needed.
  - index.js uses 2 environment variables: PORT (if no PORT env variable it defaults to 3050) and MONGO_URI, which should equal the mongoDB connection string, ie: MONGO_URI="<db connection string>"
  - data/data.xlsx is an example spreadsheet copy paste the data from your desired spreadsheet into here, or replace entirely. If the file is replaced, change the name of the file in the path for excelFile in the start method (line 46)
  
# TO USE
  - clone the repository
  - navigate to the directory
  - run npm install
  - create the .env file in the root directory
  - paste data into data/data.xlsx and save
  - change the data model to have as many properties as there are column headings in excel (https://mongoosejs.com/docs/guide.html#definition)
  - run npm start
  - upon a successful start you will see a log to the console with the port the server is listening on and that the collection was inserted
  - check the db for the newly inserted collection
