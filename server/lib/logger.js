import winston from 'winston';
import moment from 'moment';

const Logger = winston.Logger;
const File = winston.transports.File;
const Console = winston.transports.Console;

const defaultOptions = {
  filename: 'node.log',
  level: 'debug',
  prettyPrint: true,
  timestamp: createTimestamp,
  formatter: formatLogEntry,
  json: false
};
const transports = [new File(defaultOptions), new Console(defaultOptions)];

/**
 * @description Parses a meta object into a formatted json string.
 */
function parseMeta(meta) {
  try {
    return `\n${JSON.stringify(meta, null, 2)}`;
  } catch (e) {
    return meta;
  }
}

/**
 * @description Takes a winston log object (entry) and returns a nicely
 *              formatted string.
 */
function formatLogEntry(entry) {
  const timeStamp = `[${entry.timestamp()}]`;
  const meta =
    entry.meta && Object.keys(entry.meta).length ? parseMeta(entry.meta) : '';
  const level = entry.level.toUpperCase();

  const message = `${timeStamp} - ${level} - ${entry.message || ''} ${meta}`;

  return message;
}

/**
 * @description Returns a formatted timestamp string created using moment.js.
 */
function createTimestamp(format = 'HH:mm:ss') {
  return moment().format(format);
}

const logger = new Logger({ transports });

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};

export default logger;
