import {ProxyConfig} from "../config/proxy-config.model";
import {LoggerLevels} from "../config/logger.model";
import * as proxy from 'http-proxy-middleware';
import {ApiProxy} from "./api-proxy.model";
import {LoggerSetup} from "../logging/logger-setup";

export class ProxySetup {

  public proxy: ApiProxy[] = [];


  constructor(proxyList: ProxyConfig[]) {
    if (proxyList) {
      const loggerSetup = new LoggerSetup();

      for (let proxyConfig of proxyList) {
        if (proxyConfig && proxyConfig.path && proxyConfig.target) {
          if (!proxyConfig.logLevel) {
            proxyConfig.logLevel = LoggerLevels.WARN;
          }

          let proxyOptions = {
            target: proxyConfig.target,
            changeOrigin: true,
            ws: true,
            logLevel: "info",
            logProvider: function () {
              return loggerSetup.log;
            },
            pathRewrite: function (path, _) {
              return path.replace(proxyConfig.path, '/');
            },
            onProxyReq: function (proxyReq, req, res, options) {

              if (req.body) {
                var bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
              }
            }
          };

          this.proxy.push({path: proxyConfig.path, proxy: proxy(proxyOptions)});

        }
      }
    }
  }
}
