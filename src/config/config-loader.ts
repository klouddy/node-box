import {Config} from "./config.model";
import {Logger} from "winston";
import {LoggerSetup} from "../logging/logger-setup";
import {existsSync} from "fs";


export class ConfigLoader {

  config: Config;
  logger: Logger;

  constructor() {
    let loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;
    try {
      if (existsSync('./config.yml')) {
        this.config = new Config({file: './config.yml'});
        loggerSetup.setupLogger(this.config.logger.level, this.config.logger.filename);
        this.logger = loggerSetup.log;
      } else {
        console.error('!!!!! "./config.yml" CONFIG FILE MUST BE INCLUDED !!!!!\n EXITING.....');
        process.exit(1);
      }
    } catch (e) {
      console.error('Error performing config.', e);
      process.exit(1);
    }


  }
}
