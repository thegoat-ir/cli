"use strict";

const { exec } = require("child_process");

const update = {
  update() {
    exec("npm update -g thegoat", (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`Error: ${stderr}`);
        return;
      }
      console.log("Thegoat is updated.")
    });
  },
};

module.exports = update;
