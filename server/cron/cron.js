const cron = require("cron");
const https = require("https");

const URL = "https://bidblink.onrender.com/login";

const job = new cron.CronJob("*/15 * * * *", function () {
    https
        .get(URL, (res) => {
            if (res.statusCode === 200) {
                console.log("GET request sent successfully");
            } else {
                console.log("GET request failed", res.statusCode);
            }
        })
        .on("error", (e) => {
            console.error("Error while sending request", e);
        });
});

module.exports = job;