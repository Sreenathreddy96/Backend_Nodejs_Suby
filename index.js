const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const vendorRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const FirmRoutes = require("./routes/FirmRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const path = require("path");

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});

app.use("/home", (req, res) => {
  res.send("<h1>Welcome to SUBY");
});
app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", FirmRoutes);
app.use("/product", ProductRoutes);
app.use("/uploads", express.static("uploads"));

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Successfully connected to MDB");
  } catch (err) {
    console.log("Unable to connect to MDB");
    console.log(err);
  }
};
connectToMDB();
