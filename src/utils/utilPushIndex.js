"use strict";
const axios = require("axios");
const cheerio = require("cheerio");
const {google} = require('googleapis');
const {GoogleAuth} = require('google-auth-library');
const path = require("path");

class UtilPushIndex {

    constructor() {}

    /**
     * Raw tất cả các tài nguyên bao gồm hình ảnh, link có trên trang web của url
     * @param {*} url root url
     * @returns 
     */
    async extractUrls(url) {
        try {

            let { data } = await axios.get(url);
            let $ = cheerio.load(data);

            const urls = [];

            $('a').each((index, element) => {
                const link = $(element).attr('href');
                if (link && link.startsWith('http')) {
                    urls.push(link);
                }
            });

            $('img').each((index, element) => {
                const imgSrc = $(element).attr('src');
                if (imgSrc && imgSrc.startsWith('http')) {
                    urls.push(imgSrc);
                }
            });

            return urls;

        } catch (error) {
            console.log(error);
            return [];
        }
    }


    // Function to send URLs to Google Indexing API
    async sendUrlsToGoogle(urls, res, url) {
        
        // Đường dẫn đến tệp JSON của tài khoản dịch vụ Google
        const KEY_FILE_LOCATION = path.join(__dirname, "..", "env", "adept-primacy-434715-n6-33344d49c23b.json");

        // Phạm vi API cần ủy quyền
        const SCOPES = ['https://www.googleapis.com/auth/indexing'];

        // Tạo thông tin xác thực từ tài khoản dịch vụ
        async function authenticate() {
            console.log(KEY_FILE_LOCATION);

            const auth = new GoogleAuth({
                keyFile: KEY_FILE_LOCATION,
                scopes: SCOPES,
            });
            return await auth.getClient();
        }

        try {
            const authClient = await authenticate();
            const indexing = google.indexing({version: 'v3', auth: authClient});
    
            const requestBody = {
                url,
                type: 'URL_UPDATED'  // hoặc 'URL_DELETED' nếu bạn muốn xóa URL khỏi chỉ mục
            };
    
            const response = await indexing.urlNotifications.publish({requestBody});
            console.log(response);
            return {status: true};

        } catch (error) {
            console.error('Error indexing URL:', error);
            return { status: false};
        }

    }
}


module.exports = new UtilPushIndex();