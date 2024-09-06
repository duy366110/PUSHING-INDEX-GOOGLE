"use strict";
const utilPushIndex = require("../utils/utilPushIndex");

class ControllerPushIndex {

    constructor() { }

    pushIndex = async (req, res, next) => {
        try {
            let { url } = req.body;
            let urls = await utilPushIndex.extractUrls(url);
            let { status} = await utilPushIndex.sendUrlsToGoogle(urls, res, url);

            if (status) {
                return res.render("index", {
                    status: true,
                    message: "Request index sucess"
                });
            }
            return res.render("index", {
                status: false,
                message: "Request index failed"
            })

        } catch (error) {

            return res.render("index", {
                status: false,
                message: error.message
            })
        }
    }
}

module.exports = new ControllerPushIndex();