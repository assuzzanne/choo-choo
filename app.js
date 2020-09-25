const express = require("express");
const app = express();

// const csv = require("csv-parser");
// const fs = require("fs");

const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get("/status", (req, res) => {
  res.status(200).send("OK!");
});

app.get("/trains/:date", (req, res) => {
  // '2011-12-03 T 10:15:30+01:00'

});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});

module.exports = app;
