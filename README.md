# excel-to-mongo

  This tool converts data from an excel spreadsheet into a MongoDB collection and inserts it into the DB.

  The excel file should be formatted with the first row being the column headings/property names and each subsequent row being the data that will be converted to an object's values and saved to a mongoDB collection. Compare the model/DataModel.js and the data/data.xlsx files to see the relationship between the spreadsheet and data model. The data contained in each row's cells are mapped as values to the corresponding column header property names from the first row  in the spreadsheet. It doesn't matter how many column headings there are, but every heading will correspond to a property in /model/DataModel.js.

# Notes:
  - index.js uses 2 environment variables: PORT (if no PORT env variable it defaults to 3050) and MONGO_URI, which should equal the mongoDB connection string, ie: MONGO_URI="<db connection string>"
  - set the FILE_PATH environment varible to the file path to the excel spreadsheet, a sample sheet has been included at /data/data.xlsx
  
# TO USE
  - clone the repository and install
  - create a .env file in the root directory with the necessary environment variables
  - adjust the Data model to fit the desired column headings and data types (mongoose documentation: https://mongoosejs.com/docs/guide.html#definition)
  - run npm start
  - check your db for the newly inserted collection

# Unit tests coming soon
