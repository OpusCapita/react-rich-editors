import fs from "fs";
import path from "path";
import intel from "intel";

let rootPath = path.join(__dirname, '..', '..', '..');
let logsPath = path.join(rootPath, 'logs');
let configPath = path.join(rootPath, 'logging.json');

let config = {};

if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}

if (fs.existsSync(configPath)) {
  config = require(configPath);
} else {
  // define default logger config
  config = require('./logging.json');
}

intel.config(config);
intel.console();
