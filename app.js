const express = require("express");
const app = express();

const port = 3000;

const searchForTrainsHandler = require("./handlers/searchForTrainsHandler");

app.get("/status", (req, res) => {
  res.status(200).send("OK!");
});

app.get("/trains/:date", async (req, res) => {
  const result = await searchForTrainsHandler(req.params.date);
  console.log('result', result);
  const status = Array.isArray(result) ? 200 : 400;

  res.status(status).send(result);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});

module.exports = app;
