const express = require("express");
const groupController = require("../controllers/groupController");
const groupRouter = express.Router();
const { loginRequired } = require("../utils/auth");

groupRouter.get("", loginRequired, groupController.getGroupMain);
groupRouter.post("/invitation", loginRequired, groupController.sendInvitation);
groupRouter.get("/member", loginRequired, groupController.getMemberList);
groupRouter.get("/finance", loginRequired, groupController.getSharedFinances);

module.exports = groupRouter;
