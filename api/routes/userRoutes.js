const express = require("express");
const userRoutes = express.Router();
const { userControllers } = require("../controllers");

userRoutes.post("/signup", userControllers.signUp);
userRoutes.post("/presignin", userControllers.presignIn);
userRoutes.post("/signin", userControllers.signIn);

module.exports = userRoutes;
