const express = require("express");
const userRoutes = express.Router();
const { userControllers } = require("../controllers");

userRoutes.post("/presignin", userControllers.presignIn);
userRoutes.post("/CI", userControllers.getCIByPhoneNumber);
userRoutes.post("/signup", userControllers.signUp);
userRoutes.post("/signin", userControllers.signIn);

module.exports = userRoutes;
