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
import {ConfigInitData} from "./config/config-init-data";
import {dirname, join} from 'path';

export class NodeBox {
  public app: Application;
  public logger: Logger;

  constructor(initData: ConfigInitData) {
    console.log('filename:' + __filename);
    console.log('dirname:' + __dirname);
    console.log('main filename:' + require.main.filename);
    let c = new ConfigLoader(initData);
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

    //setup static
    this.logger.info(`Setting up static path ${c.config.staticConfig.path} -> ${c.config.staticConfig.src}`);
    this.app.use(express.static(c.config.staticConfig.src));
    this.app.all('/*', (req, res, next) => {
      res.sendFile(join(dirname(require.main.filename), c.config.staticConfig.src, 'index.html'));
    });
  }
}
