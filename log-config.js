const { transports } = require('winston');
const MyCustomTransport = require('../logging-sample/MyCustomTransport.js_1');

const logTypes = {
  'Console': transports.Console,
  'File': transports.File,
  'Custom': MyCustomTransport
};

module.exports = {
  pattern: '{"timestamp":"${timestamp}", "correlationId": "${correlationId}", "component": "${component}", "filename": "${label}","partner": "${partner}", "customer": "${customer}", "message": ${message}}',
  appenders: [
    {
      // Console 
      type: logTypes.Console,
      options: {
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
      }
    },
    {
      // Console 
      type: logTypes.Custom,
      options: {
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
      }
    },

  ]
};
