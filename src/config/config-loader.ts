import {Config} from "./config.model";
import {Logger} from "winston";
import {LoggerSetup} from "../logging/logger-setup";
import {existsSync} from "fs";
import {ConfigInitData} from "./config-init-data";


export class ConfigLoader {

  config: Config;
  logger: Logger;

  constructor(initData: ConfigInitData) {
    if (!initData || !initData.filename) {
      console.error('!!!! {filename: string} not provided to constructor. !!!!\n Example: "new NodeBox({filename: \'./config.yml\'})" \n EXITING....');
      process.exit(1);
    }
    let loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;
    try {
      if (existsSync(initData.filename)) {
        this.config = new Config(initData);
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
