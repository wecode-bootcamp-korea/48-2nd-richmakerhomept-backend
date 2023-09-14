const express = require("express");
const userRoutes = express.Router();
const { userControllers }  = require("../controllers")
const { loginRequired } = require("../utils/auth");

userRoutes.post("/presignin", userControllers.presignIn);
userRoutes.post("/CI", userControllers.getCIByPhoneNumber);
userRoutes.post("/signup", userControllers.signUp);
userRoutes.post("/signin", userControllers.signIn);
userRoutes.post("/password",loginRequired, userControllers.changePassword)

module.exports = userRoutes;
