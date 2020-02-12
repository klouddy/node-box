import * as express from 'express';
import {Router} from 'express';
import {Config} from "./config/config.model";
import {setupMetrics} from "./metrics/metrics-setup";

export class ActuatorController {
  public router: Router;
  public config: Config;

  constructor(config: Config) {
    this.config = config;
    this.router = express.Router();

    this.router.get(config.info.path, (req, res) => {
      res.json(this.config.info.data);
    });

    this.router.get(config.health.path, (req, res) => {
      res.json(this.config.health.data);
    });

    this.router.use(setupMetrics(config.metrics.path));
  }
}
