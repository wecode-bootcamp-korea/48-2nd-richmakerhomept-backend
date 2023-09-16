const express = require("express");
const route = express.Router();
const userRoutes = require("./userRoutes");
const providerRoutes = require("./providerRoutes");

route.use("/user", userRoutes);
route.use("/providers", providerRoutes);

module.exports = route;
