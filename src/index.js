require("dotenv").config();
const express = require("express");
const multer = require("multer");
const ExcelJS = require("exceljs");
const mongoose = require("mongoose");
const User = require("./models/userSchema");

const port = process.env.PORT;
const database = process.env.MONGO_DB;
const app = express();

// connect mongodb
mongoose.connect(database);

// upload file setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API
app.post("/import-excel", upload.single("file"), async (req, res) => {
  try {
    // check if file is received
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // create excelJs workbooks
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0]; // select first sheet

    // read data
    let users = [];
    worksheet.eachRow((row, rowNumber) => {
      // skip header
      if (rowNumber != 1) {
        const name = row.getCell(1).value;
        const email = row.getCell(2).value;
        users.push({ name, email });
      }
    });

    // insert data to mongodb
    await User.insertMany(users);
    res.json({ message: "Insert complete", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
