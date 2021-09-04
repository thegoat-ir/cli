"use strict";

const config = require("./config.json");
const https = require("https");
const whois = {
  lookup(domain, flags) {
    const options = {
      hostname: config.API_HOST_NAME,
      port: config.API_PORT_NUMBER,
      path: `/subdomain/lookup?token=${config.API_TOKEN}&domain=${domain}`,
      method: "GET",
    };
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        if (flags.j || flags.json) console.log(data);
        else {
          let key;
          const info = JSON.parse(data);
          for (key in info) {
            console.log(info[key]);
          }
        }
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  },
};

module.exports = whois;
