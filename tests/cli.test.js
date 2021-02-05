"use strict";

const path = require("path");
const readline = require("readline");
const fs = require("fs");
const { exec } = require("child_process");

describe("cli", () => {
  const cli = path.resolve(__dirname, "../cli.js");
  const domains = path.resolve(__dirname, "fixtures/domains.txt");
  const readInterface = readline.createInterface({
    input: fs.createReadStream(domains),
    output: process.stdout,
    console: false,
  });

  it("lookup domain whois", (done) => {
    readInterface.on("line", function (input) {
      exec(`${cli} whois ${input}`, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout).not.toBe("");
        expect(stdout).toMatch(/Generated by whois.thegoat.ir/);
        done();
      });
    });
  });

  it("validate required arguments", (done) => {
    exec(`${cli}`, (error, stdout, stderr) => {
      expect(error).not.toBeNull();
      expect(stderr).not.toBe("");
      expect(stdout).not.toBe("");
      done();
    });
  });
});
