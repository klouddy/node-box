"use strict";
import * as express from 'express';
import {Application} from 'express';
import * as bodyParser from "body-parser";
import {ActuatorController} from "./actuator";
import {ConfigLoader} from "./config/config-loader";
import {Logger} from "winston";
import {LoggerSetup} from "./logging/logger-setup";
import {ProxySetup} from "./proxy/proxy-setup";
import * as helmet from 'helmet';
import {LoggingController} from "./logging/logging-controller";

export class NodeBox {
  public app: Application;
  public logger: Logger;

  constructor() {
    let c = new ConfigLoader();
    let loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;

    this.app = express();
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));

    let controller = new ActuatorController(c.config);
    this.app.use(c.config.actuator.prefix || '', controller.router);
    let loggerController = new LoggingController();
    this.app.use(c.config.logger.postPath || '/logger', loggerController.router);

    let proxySetup = new ProxySetup(c.config.proxies);

    for (let proxy of proxySetup.proxy) {
      this.logger.info('adding proxy for: ' + JSON.stringify(proxy));
      this.app.use(proxy.path, proxy.proxy);
    }


  }
}
