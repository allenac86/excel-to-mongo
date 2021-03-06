# excel-to-mongo

  This tool reads an excel spreadsheet and inserts each row as a document to a mongoDB collection when the app is started. This was designed as a one-time use, so every time the app is started the collections will be added to the db. The tool only needs to be run once for each data set you want to turn into a mongoDB collection. In order to use this tool you will need to have node installed and a mongoDB connection string.

  The excel file should be formatted with the first row being the column headings/property names and each subsequent row being the data that will be converted to an object's values and saved to a mongoDB collection. Compare the model/DataModel.js and the data/data.xlsx files to see the relationship between the spreadsheet and data model. The data contained in each row's cells are mapped as values to the corresponding column header property names from the first row  in the spreadsheet. It doesn't matter how many column headings there are, but every heading will correspond to a property in /model/DataModel.js.

# Notes:
  - model/DataModel.js is set up to accept 4 properties for the document, 2 required strings, a required number, and an optional boolean that defaults to true. Edit this file according to the needs of your data. This project uses environment variables for the DataModel property names. Create a .env file with the varibles PROP_ONE="<prop name>", PROP_TWO="<prop name>", PROP_THREE="<prop name>", and PROP_FOUR"<prop name>" to create 4 property names, or add/remove as needed. Create an environment variable for the data model. If MODEL_NAME="Book" (notice the capitalization of the B in Book, and that it is singular), the mongo collection will be called "books".
  - index.js uses 2 environment variables: PORT (if no PORT env variable it defaults to 3050) and MONGO_URI, which should equal the mongoDB connection string, ie: MONGO_URI="<db connection string>"
  - data/data.xlsx is an example spreadsheet copy paste the data from your spreadsheet into this file, or replace the file with your own. If the file is replaced, change the name of the file in the path for excelFile in the start method (line 53 of app.js)
  
# TO USE
  - clone the repository
  - navigate to the directory
  - run npm install
  - create the .env file in the root directory
  - paste data into data/data.xlsx and save
  - change the data model to have as many properties as there are column headings in your excel data (mongoose documentation: https://mongoosejs.com/docs/guide.html#definition)
  - run npm start
  - upon a successful start you will see a log to the console with the port the server is listening on and that the collection was inserted
  - check the db for the newly inserted collection
  - running npm start will insert every document into the collection every time

# Unit tests coming soon
