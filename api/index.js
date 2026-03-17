const dotenv = require("dotenv");

dotenv.config();

const { connectToDatabase } = require("../src/database/connect");
const app = require("../modules/express");

connectToDatabase();

module.exports = app;
