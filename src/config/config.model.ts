import {InfoConfig} from "./info-config.model";
import {LoggerConfig} from "./logger.model";
import {MetricsConfig} from "./metrics-config.model";


export class Config {
  prefix: string;
  info: InfoConfig;
  health: InfoConfig;
  logger: LoggerConfig;
  metrics: MetricsConfig;


  constructor() {

  }
}
