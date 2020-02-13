import {Logger} from "winston";

export class EnvConverter {

  convertedObject: any;

  constructor(objToConvert, public logger?: Logger) {
    let jsonStr = JSON.stringify(objToConvert);
    this.convertedObject = {...objToConvert};
    if (jsonStr && jsonStr.indexOf('${') > -1) {
      let currIndex = jsonStr.indexOf('${');
      let foundIndex = true;
      while (foundIndex) {
        let endEnvVar = jsonStr.indexOf('}', currIndex + 1);
        let newValue = this.processEnvString(jsonStr.substring(currIndex + 2, endEnvVar));
        jsonStr = this.replaceVariable(jsonStr, currIndex, endEnvVar + 1, newValue);
        currIndex = jsonStr.indexOf('${', currIndex + 1);
        if (currIndex === -1) {
          foundIndex = false;
        }
      }

      this.convertedObject = JSON.parse(jsonStr);
    }
  }


  private processEnvString(envString: string) {
    if (envString) {
      if (envString.indexOf(';') !== -1) {
        let envVar = envString.split(';')[0];
        let defaultVal = envString.split(';')[1];
        return process.env[envVar] || defaultVal;
      } else {
        let envVal = process.env[envString];
        if (!envVal) {
          if (this.logger) {
            this.logger.warn(`Could not resolve environment variable ${envString}`);
          }
          return '';
        } else {
          return envVal;
        }
      }
    }
  }

  private replaceVariable(jsonStr: string, start: number, end: number, replacementValue: string) {
    return jsonStr.substring(0, start) + replacementValue + jsonStr.substring(end, jsonStr.length);
  }
}
