process.env.LOG_LEVEL = 'info';
const loggingAuditUtils = require("../logging-audit-utils");

const logger = loggingAuditUtils.Logger.getLogger("com", "f");
const workflowStatuses = loggingAuditUtils.Statuses.WORKFLOW;

let auditLog = new loggingAuditUtils.AuditLogger.Builder(logger, {});
auditLog.withWorkflowStatus(workflowStatuses.STARTED).withWorkflowInfo("sample data").build().generateAuditlog();
logger.notice("hiiiii");
