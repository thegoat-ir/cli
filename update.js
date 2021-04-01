"use strict";

const { exec } = require("child_process");

const update = {
  update() {
    exec("npm update thegoat", (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`Error: ${stderr}`);
        return;
      }
      if (stdout.includes("up to date"))
        console.log("Thegoat is already up-to-date.");
      else console.log(stdout);
    });
  },
};

module.exports = update;
