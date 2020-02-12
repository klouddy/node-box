import * as winston from 'winston';
import {LoggerLevels} from "../config/logger.model";

export const setupLogger = function (level: string = LoggerLevels.WARN, logfile: string = undefined) {

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


  const console = new winston.transports.Console({
    format: winston.format.json()
  });
  let logger = winston.createLogger({
    level: level,
    format: winston.format.json(),
    transports: [console]
  });

  if (logfile && logfile.length > 0) {
    logger.add(new winston.transports.File({filename: logfile}))
  }
  return logger;
};
