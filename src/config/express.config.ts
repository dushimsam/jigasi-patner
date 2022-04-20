import express from "express";
const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

exports.app = app;