"use strict";
const express = require("express");
const routerViewHome = require("./views/routerHome");
const routerControllerPushIndex = require("./controllers/routerPushIndex");

const router = express.Router();

router.use("/", routerViewHome);
router.use("/push-index", routerControllerPushIndex);

module.exports = router;