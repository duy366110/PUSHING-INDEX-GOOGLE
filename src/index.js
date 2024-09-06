"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./routers/router");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

module.exports = app;