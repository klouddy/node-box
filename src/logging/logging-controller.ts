import * as express from "express";
import {Router} from "express";
import {Config} from "../config/config.model";
import {Logger} from "winston";
import {LoggerSetup} from "./logger-setup";

export class LoggingController {
  public router: Router;
  public config: Config;
  private logger: Logger;

  constructor() {
    const loggerSetup = new LoggerSetup();
    this.logger = loggerSetup.log;

    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/log', (req, res) => {
      if (req.body && req.body.message && req.body.level) {
        this.logger.log(req.body.level, req.body.message);
      }
      res.status(204).send();
    })
  }
}
