import * as express from 'express';
import {Router} from 'express';
import {Config} from "./config/config.model";
import {setupMetrics} from "./metrics/metrics-setup";
import {LoggerSetup} from "./logging/logger-setup";
import {Logger} from "winston";
import {readFile} from "fs";


export class ActuatorController {
  public router: Router;
  public config: Config;
  private logger: Logger;

  constructor(config: Config) {
    this.config = config;
    this.router = express.Router();
    let loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;

    this.router.get(config.actuator.paths.info, (req, res) => {
      res.json(config.application);
    });

    this.router.get(config.actuator.paths.health, (req, res) => {
      res.json({status: "up"});
    });

    this.router.use(setupMetrics(config.actuator.paths.metrics));

    this.router.get(config.actuator.paths.logger, (req, res) => {
      console.log('file path ' + config.logger.filename);
      readFile(config.logger.filename, function (err, data) {
        if (err) throw err;
        res.send(data);
      })
    })
  }
}
