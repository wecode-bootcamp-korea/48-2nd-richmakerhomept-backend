const express = require("express");
const groupRouter = require("./groupRouter");
const route = express.Router();
const userRoutes = require("./userRoutes");
const providerRoutes = require("./providerRoutes");

route.use("/user", userRoutes);
route.use("/group", groupRouter);
route.use("/providers", providerRoutes);

module.exports = route;
