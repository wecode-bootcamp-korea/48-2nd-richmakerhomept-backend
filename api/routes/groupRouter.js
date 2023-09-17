const express = require("express");
const groupController = require("../controllers/groupController");
const groupRouter = express.Router();

groupRouter.post("/invitation", groupController.sendInvitation);
groupRouter.get("/member", groupController.getMemberList);

module.exports = groupRouter;
