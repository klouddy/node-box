import * as winston from 'winston';
import {Logger} from 'winston';
import {LoggerLevels} from "../config/logger.model";


let log: Logger;
const initLogger = function (level: string = LoggerLevels.WARN, logfile: string = undefined) {

  //check levels
  if (!level
      && level !== 'error'
      && level !== 'warn'
      && level !== 'info'
      && level !== 'http'
      && level !== 'verbose'
      && level !== 'debug'
      && level !== 'silly'
  ) {
    level = 'warn'
  }


  const myFormat = winston.format.printf(({message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`
  });

  const console = new winston.transports.Console({
    format: winston.format.json()
  });


  let logger = winston.createLogger({
    level: level,
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat
    ),
    transports: [console]
  });

  if (logfile && logfile.length > 0) {
    logger.add(new winston.transports.File({filename: logfile}))
  }

  log = logger;
};

export class LoggerSetup {
  constructor() {
    if (!log) {
      initLogger();
    }
  }

  setupLogger(level: string = LoggerLevels.WARN, logfile: string = undefined) {
    initLogger(level, logfile);
  }

  get log(): Logger {
    return log;
  }
}
