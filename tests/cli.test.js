"use strict";

const path = require("path");
const readline = require("readline");
const fs = require("fs");
const { exec } = require("child_process");

describe("cli", () => {
  const cli = path.resolve(__dirname, "../cli.js");
  const domains = path.resolve(__dirname, "fixtures/domains.txt");

  it("lookup domain whois", (done) => {
    fs.readFile(domains, function (err, input) {
      exec(`${cli} whois ${input.toString()}`, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout).not.toBe("");
        expect(stdout).toMatch(/Generated by thegoat.ir/);
        done();
      });
    });
  });

  it("lookup domain subdomains", (done) => {
    fs.readFile(domains, function (err, input) {
      exec(`${cli} sub ${input.toString()}`, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe("");
        expect(stdout).not.toBe("");
        expect(stdout).toContain("blog.mahdyar.me");
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
