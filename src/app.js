const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const courseInfo = require("./routes/coursInfo");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

routes.get("/", (req, res) => {
  res.status(200).send("welcome to sainadhs first backend project");
});

routes.use("/courses", courseInfo);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "server is successfully running and App is listening on port " + PORT
    );
  } else {
    console.log("Error occured, server can't start", error);
  }
});
