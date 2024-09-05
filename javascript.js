const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

const logReq = function (req, res, next) {
  console.log("Request Received");
  next();
};

app.use(logReq);

app.get("/", (req, res) => {
  res.send("Keeping it simple.");
});
