const { transports } = require('winston');

const logTypes = {
  'Console': transports.Console,
  'File': transports.File
};

// Base pattern with required fields
const basePattern = {
  level: "${level}",
  timestamp: "${timestamp}",
  correlationId: "${correlationId}",
  component: "${component}",
  filename: "${label}",
  partner: "${partner}",
  customer: "${customer}",
  tenantId: "${tenantId}",
  message: "${message}"
};

module.exports = {
  pattern: JSON.stringify(basePattern),
  appenders: [
    {
      // Console 
      type: logTypes.Console,
      options: {
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        json: true,
        colorize: true,
      }
    }
  ]
};
