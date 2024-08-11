const { transports } = require('winston');

const logTypes = {
  'Console': transports.Console,
  'File': transports.File
};

module.exports = {
  pattern: '{ "level": "${level}", "timestamp":"${timestamp}", "correlationId": "${correlationId}", "component": "${component}", "filename": "${label}","partner": "${partner}", "customer": "${customer}", "message": ${message}}',
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
    }
  ]
};
