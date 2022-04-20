import express from "express";
const path = require("path");

const APP = express();

APP.use("/public", express.static(path.join(__dirname, "public")));

exports.app = APP;