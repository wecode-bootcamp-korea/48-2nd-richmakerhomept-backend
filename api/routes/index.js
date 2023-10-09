const express = require("express");
const groupRouter = require("./groupRouter");
const route = express.Router();
const userRoutes = require("./userRoutes");
const providerRoutes = require("./providerRoutes");
const financeDataRouter = require("./financeDataRouter");
const transactionDataRouter = require("./transactionDataRouter");

route.use("/user", userRoutes);
route.use("/group", groupRouter);
route.use("/providers", providerRoutes);
route.use("/reports", financeDataRouter)
route.use("/transactions", transactionDataRouter)

module.exports = route;
