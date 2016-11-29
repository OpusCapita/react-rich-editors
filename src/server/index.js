import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
// initialize logging
import "./logger";

let componentsRoot = path.resolve(__dirname, '../client/components');
require('@opuscapita/showroom-server').makeLocalScan(componentsRoot);

// create express app
const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;
const host = process.env.HOST ? process.env.HOST : 'localhost';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev', {
    stream: {
      write: console.log
    }
  }));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
app.use(webpackMiddleware(webpack(require('../../webpack.development.config.js')), {
  publicPath: '/static',
  noInfo: true
}));

app.use(express.static(__dirname + '/../client/demo'));
app.get(['/'], function(req, res) {
  res.sendFile(path.normalize(__dirname + '/../client/demo/index.html'));
});

// launch application
app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
