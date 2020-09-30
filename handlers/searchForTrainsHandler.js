const csv = require("csv-parser");
const fs = require("fs");
const moment = require("moment");

async function getDataFromCsvFile() {
  const csvData = [];

    fs.createReadStream("data.csv")
      .pipe(csv())
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("error", () => {
        console.error("Failed to process the CSV file!");
      })
      .on("end", () => {

        console.log("csvData", csvData);
        console.info("CSV file successfully processed");
        return csvData;
      });
}

module.exports = async function process(dateInString) {
  // Here the code checks if received parameter is a string representing a date
  if (isNaN(Date.parse(dateInString))) {
    return "The parameter format is not correct!";
  }

  // using the moment lib to convert the date in utc
  // and format it in hours and minutes to compare it to the times from the csv file
  const UTCTimeFormatted = moment(dateInString)
    .utc()
    .format("HH:mm")
    .toString();

  const dataFromCsvFile = await getDataFromCsvFile();
  console.log("dataFromCsvFile", dataFromCsvFile);
  // return dataFromCsvFile.filter((elem) => elem.time > UTCTimeFormatted);
};
