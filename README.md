# Node Box
[![Build Status](https://travis-ci.com/klouddy/node-box.svg?branch=master)](https://travis-ci.com/klouddy/node-box.svg?branch=master)

Quick way to create an express app for static html/js sites with some extra features.

**Install**

`npm install --save @klouddydev/node-box`

**Sample Usage**

```js
const nodeBox = require('@klouddydev/node-box');

var a = new nodeBox.NodeBox({filename: './config.yml'});

a.logger.warn('logging warn message');
a.app.listen(3000, () => {
  console.log('listening on 3000')
});
```
** Example config file **
```yml
actuator:
    prefix: /actuator
    paths:
        info: /info
        health: /health
        metrics: /prometheus
        logger: /logfile
application:
    name: App name
static:
    path: /
    src: ./public
logger:
    level: info
    filename: app.log
    postPath: /logger
proxies:
    - path: /api
      target: http://localhost:8080
      logLevel: info
```

## Configuration

Must include a config file.

**Actuator**

This comes from spring boot. The intention is to provide some basic information about the app
and some typically useful access points.  

 - `prefix` is the leading path for access the rest of the actuator endpionts
 - `paths.info` endpoint for getting info details.  This will return a json value of
 everything in the `applciation` property.  IT will be converted to a JSON object and returned.
 - `paths.health` endpoint for getting health response. Health endpoint will return `{"status":"up"}`
 - `paths.logger` endpoint to view the logfile that is created by the app.  
 - `paths.metrics` endopoint to view the prometheus metrics for the app.  
 The metrics are accomplished by using `prometheus-api-metrics`
 

**Application**

This can be any properly formatted yml.  It will be converted to a json object and returned to the `/acuator/info` endpoint

**Static**

Config for serving static html/js content

- `path` is the endpoint that the static files will be served from.
- `src` is the relative path the static files are located in.

**Logger**

Configuration for logger of the express application.  Uses `winstonjs`.

- `level` log level
- `filename` if this is present the application will also write log messages to a file. 
It will also be what is returned when accessing the `/actuator/logger` endpoint.
- `postPath` is the path used to post a log message to. Can be used for external logging of a SPA.

**Proxies**

Configuration of reverse proxies created.  This is accomplished by using the `http-proxy-middleware`. 
It is a list of proxies.

- `path` path the proxy is accessible from.
- `target` target for the reverse proxy.
- `logLevel` log level set for the revers proxy.
