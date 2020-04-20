const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const postRouters = require("./routes/posts");
const userRouters = require("./routes/users");

// Import the Mongodb Connection file
require("./db/mongoose");

const app = express();

//package  the user side data into json for nodejs
app.use(bodyParser.json());

//this access for image folder to all requests
//1
// app.use("/images", express.static(path.join("backend/images")));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

// this request for make connection In between angular and nodejs
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/posts", postRouters);
app.use("", userRouters);
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

module.exports = app;
