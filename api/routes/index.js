const express = require("express");
const route = express.Router();
const mainRoutes = require("./mainRoutes");
const groupRouter = require("./groupRouter");
const userRoutes = require("./userRoutes");
const providerRoutes = require("./providerRoutes");
const financeDataRouter = require("./financeDataRouter");
const transactionDataRouter = require("./transactionDataRouter");

route.use("/main", mainRoutes);
route.use("/user", userRoutes);
route.use("/group", groupRouter);
route.use("/providers", providerRoutes);
route.use("/reports", financeDataRouter)
route.use("/transactions", transactionDataRouter)

module.exports = route;
