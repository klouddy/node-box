export const LoggerLevels = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug'
};


export interface LoggerConfig {
  filename?: string;
  level?: string;
  postPath?: string;
}
