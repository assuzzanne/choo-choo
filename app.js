const express = require("express");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
const moment = require("moment");

const port = 3000;

app.get("/status", (req, res) => {
  res.status(200).send("OK!");
});

app.get("/trains/:date", (req, res) => {
  // {"date":"2011-12-03T10:15:30+01:00"}
  // using the moment lib to convert the date in utc
  // and format it in hours and minutes to compare it to the times from the csv file
  const UTCTimeFormatted = moment(req.params.date).utc().format("HH:mm").toString();

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
      console.info("CSV file successfully processed");
      const result = csvData.filter((elem) => elem.time > UTCTimeFormatted)
      res.status(200).send(result.slice(0, 3));
    });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});

module.exports = app;
