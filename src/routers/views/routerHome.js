"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index", {
        status: null,
        message: ""
    });
})

module.exports = router;