import * as nconf from 'nconf';
import {Config} from "./config.model";
import {Logger} from "winston";
import {setupLogger} from "../logging/logger-setup";

export class ConfigLoader {

  config: Config;
  logger: Logger;

  constructor() {
    this.logger = setupLogger();
    this.config = new Config();
    nconf.argv().env().file({file: './config.json'});
    this.config.prefix = nconf.get('prefix');
    this.setupInfo();
    this.setupHealth();
    this.setupLogger();
    this.setupMetrics();
  }

  private setupInfo() {
    var i = nconf.get('info');
    if (!i) {
      this.logger.warn('Info data not provided');
    }
    this.config.info = i;
  }

  private setupHealth() {
    var h = nconf.get('health');
    if (!h) {
      this.logger.warn('health data not provided.');
    }
    this.config.health = h;
  }

  private setupLogger() {
    var loggerDetails = nconf.get('logger');
    if (!loggerDetails) {
      this.logger.warn('logging details not provided.');
    } else {
      this.logger = setupLogger(loggerDetails.level, loggerDetails.filename);
    }
    this.config.logger = loggerDetails;
  }

  private setupMetrics() {
    var metricsDetails = nconf.get('metrics');
    if (!metricsDetails) {
      this.logger.warn('Metrics details not provided using default of /metrics for path.');
      metricsDetails = {path: '/prometheus'};
    }
    this.config.metrics = metricsDetails;
  }
}
