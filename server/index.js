require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMidlware");
const fileUpload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Running server on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
