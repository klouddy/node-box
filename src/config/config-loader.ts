import {Config} from "./config.model";
import {Logger} from "winston";
import {LoggerSetup} from "../logging/logger-setup";


export class ConfigLoader {

  config: Config;
  logger: Logger;

  constructor() {
    let loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;

    this.config = new Config({file: './config.yml'});
    loggerSetup.setupLogger(this.config.logger.level, this.config.logger.filename);
    this.logger = loggerSetup.log;
  }
}
