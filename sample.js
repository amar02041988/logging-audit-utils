process.env.LOG_LEVEL = 'info';
const loggerPackage = require("./winston");
const logger = loggerPackage.getLogger("componentName", "fileName");

const AuditLogger = require("./AuditLogger");

const WORKFLOW_STATUS = AuditLogger.STATUS.WORKFLOW;
let auditLog = new AuditLogger.AuditLogger.Builder(logger,{});
auditLog.withWorkflowStatus(WORKFLOW_STATUS.STARTED).withWorkflowInfo("Workflow Data").build().generateAuditlog();

