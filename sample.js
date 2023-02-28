process.env.LOG_LEVEL = 'info';
process.env.COMPONENT = 'sample';
const loggingAuditUtils = require("../logging-audit-utils");

const logger = loggingAuditUtils.Logger.getLogger("com", "f");
logger.notice("my hi");
