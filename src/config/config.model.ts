import {LoggerConfig, LoggerLevels} from "./logger.model";
import {ActuatorConfig} from "./actuator-config.model";
import {ConfigInitData} from "./config-init-data";
import {safeLoad} from 'js-yaml';
import {readFileSync} from "fs";
import {ProxyConfig} from "./proxy-config.model";
import {EnvConverter} from "./env-converter";
import {StaticConfig} from "./static-config.model";

const actuatorDefault: ActuatorConfig = {
  prefix: 'actuator',
  paths: {
    health: 'health',
    info: 'info',
    logger: 'logfile',
    metrics: 'prometheus'
  }
};

const loggerConfigDefault: LoggerConfig = {
  filename: 'app.log',
  level: LoggerLevels.WARN,
  postPath: '/logger'
};

const applicationDefault = {
  name: "Default application name",
};

const staticConfigDefault: StaticConfig = {
  path: '/',
  src: './public'
};


export class Config {
  public actuator: ActuatorConfig;
  public logger: LoggerConfig;
  public staticConfig: StaticConfig;
  public application: any;
  public proxies: ProxyConfig[] = [];

  constructor(
      public initData: ConfigInitData
  ) {
    this.actuator = actuatorDefault;
    this.logger = loggerConfigDefault;
    this.application = applicationDefault;
    this.staticConfig = staticConfigDefault;

    if (initData && initData.filename && initData.filename.length > 0) {
      let configObj = this.loadYamlConfig(initData.filename);
      let envConverter = new EnvConverter(configObj);

      if (envConverter.convertedObject) {
        configObj = envConverter.convertedObject;
      }
      if (configObj && configObj.actuator) {
        this.actuator = configObj.actuator;
      }
      if (configObj && configObj.logger) {
        this.logger = configObj.logger;
      }

      if (configObj && configObj.application) {
        this.application = configObj.application
      }

      if (configObj && configObj.proxies) {
        this.proxies = configObj.proxies;
      }

      if (configObj && configObj.static) {
        this.staticConfig = configObj.static;
      }

    }
  }

  private loadYamlConfig(file: string): any {
    try {
      let fileContents = readFileSync(file, 'utf8');
      return safeLoad(fileContents);
    } catch (error) {
      console.error('error loading yaml file', error);
    }
  }
}
