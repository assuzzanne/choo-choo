const fs = require("fs");
const moment = require("moment");

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

  const readFile = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, encoding, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  };

  const csvData = [];
  await readFile("data.csv", "utf8")
    .then((data) => {
      const tempArray = data.split("\n");

      tempArray.forEach((elem) => {
        const [trainTime, trainName] = elem.split(", ");
        const object = { time: trainTime, train: trainName };
        csvData.push(object);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return csvData.filter((elem) => elem.time > UTCTimeFormatted).slice(0, 3);
};
