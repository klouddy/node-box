import * as prometheusApiMetrics from 'prometheus-api-metrics';

export const setupMetrics = function (path) {
  return prometheusApiMetrics({
    metricsPath: path
  });
};
