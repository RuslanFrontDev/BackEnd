const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routes");
const customErrorHandler = require("./middleware/errors/customErrorHandler.js");
dotenv.config({
  path: "./config/env/config.env",
});
connectDatabase();
const app = express();


const PORT = process.env.PORT;
app.use(express.json())

// Routers Middleware
app.use("/api", routers);
//Error Middleware
app.use(customErrorHandler)
app.listen(PORT, () => {
  console.log("express hazir");
});
