#!/usr/bin/env node
"use strict";

const meow = require("meow");
const whois = require("./whois");
const cli = meow(`
	Usage
	  $ thegoat <command> <input> [options]

Commands

      whois
        $ thegoat whois <domain> [options]

        Options
        --json, -j  print as json

        Example
        $ thegoat whois example.com

    
`);
const command = cli.input[0];
const input = cli.input[1];
const inputLength = cli.input.length;
const flags = cli.flags;

if (inputLength == 0) error("Missing: command");
else {
  switch (command) {
    case "whois":
      if (inputLength == 2) whois.lookup(input, flags);
      else error("Missing: domain");
      break;
    default:
      error("Notfound: command");
  }
}

function error(message) {
  console.error(message);
  cli.showHelp(1);
}
