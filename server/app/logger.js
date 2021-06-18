const { createLogger, format, transports, stream } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, json  } = format;
const moment = require('moment');
var now = moment()

const myFormat = printf(({ level, message, label, timestamp }) => {
  if (message && message.constructor === Object) {
     // to format json and js
    message = JSON.stringify(message, null, 4)
  }
  return `${timestamp} [${level}]: ${message} `;
});

const myCustomLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    info: 5,
    notice: 6,
    debug: 7
  },
  colors: {
    info: 'green',
    error: 'red'
  }
};

global.combinedLogFile = `combined ${now.format("YYYY-MM-DD HH-mm-ss")}.log`;
global.ErrorLogFile = `errors ${now.format("YYYY-MM-DD HH-mm-ss")}.log`;


const logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      prettyPrint(),
      format.splat(),
      format.simple(),
      format.json(),
      myFormat
  ),
  transports: [
    new transports.Console({
      level:'info' ,
      format: format.combine(
        format.colorize(),
        myFormat
      )
    }),
    new transports.File({
      filename: `Logs/combined ${now.format("YYYY-MM-DD HH-mm-ss")}.log`,
      level: 'notice',
      options: { flags: 'w' }
    }),
    new transports.File({
      filename: `Logs/errors ${now.format("YYYY-MM-DD HH-mm-ss")}.log`,
      level: 'error',
      options: { flags: 'w' }
    })
  ],
   exitOnError: false
});



module.exports = logger;
