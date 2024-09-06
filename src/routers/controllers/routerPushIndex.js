"use strict";
const express = require("express");
const ControllerPushIndex = require("../../controllers/controllerPushIndex");

const router = express.Router();

router.post("/", ControllerPushIndex.pushIndex);

module.exports = router;