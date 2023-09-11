const express = require('express');
const route = express.Router();
const userRoutes = require("./userRoutes");

route.use("/user", userRoutes);

module.exports =  route ;
