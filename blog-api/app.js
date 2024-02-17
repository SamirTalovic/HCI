require("express-async-errors");
require("dotenv").config();
require("./db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const postRouter = require("./routes/post");
const { handleAsyncError } = require("./middlewares/error");

const app = express();

app.use(cors({ origin: ["https://65d0d1a0026f86b16193fdf4--spiffy-macaron-d41591.netlify.app","exp://192.168.0.19:8081","http://localhost:8081"] }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/post", postRouter);

app.use(handleAsyncError);

const PORT = process.env.PORT;

app.listen(4646, () =>
  console.log("Port is listinging on: ", "http://localhost:4848" )
);
