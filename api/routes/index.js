const express = require("express");
const groupRouter = require("./groupRouter");
const route = express.Router();
const userRoutes = require("./userRoutes");

route.use("/user", userRoutes);
route.use("/group", groupRouter);

module.exports = route;
