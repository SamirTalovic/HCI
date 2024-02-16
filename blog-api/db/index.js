const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://steamzamenabycomi:ADMIN1@cluster0.hgb9ltw.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("db is connected");
  })
  .catch((ex) => {
    console.log("db connection failed: ", ex.message || ex);
  });
