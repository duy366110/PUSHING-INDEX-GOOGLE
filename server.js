"use strict";
const app = require("./src/index");

app.listen(3000, (error) => {
    if(error) console.log("Server error");
    console.log("Server running");
})
