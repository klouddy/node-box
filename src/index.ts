"use strict";
import * as express from 'express';
import * as bodyParser from "body-parser";
import {ActuatorController} from "./actuator";
import {ConfigLoader} from "./config/config-loader";

module.exports = function () {
  let c = new ConfigLoader();
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  var controller = new ActuatorController(c.config);
  app.use(c.config.prefix || '/', controller.router);

  return app;
};
