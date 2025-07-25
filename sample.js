process.env.LOG_LEVEL = 'info';
process.env.COMPONENT = 'au-pricing-agent';
const { Logger, AuditLogger, Statuses } = require("../logging-audit-utils");

const crypto = require('crypto');
const correlation_id = crypto.randomUUID();

let options = {
    correlation_id: correlation_id,
    identites: {
        customer: "test-cutomer",
        partner: "test-partner"
    }
}

const logger = Logger.getLogger("sample", options.correlation_id, options.identites, { entity: "mysample" });
// logger.info("Sample Log");

let auditLogger = new AuditLogger.Builder(logger, options);

console.log(`----------------------------------------------`);
auditLogger.withStepCategory("invocation").withEntity("ip")
    .withStepStatus(Statuses.ENTITY.STARTED)
    .withWorkflowInfo("Request Received")
    .withRecordAuditFlag(true)
    .withProjectCode("intel")
    .withRegion("eu")
    .withCountry("it")
    .withClientId("client-id")
    .build().
    generateAuditlog();

console.log(`----------------------------------------------`);
auditLogger = new AuditLogger.Builder(logger, options);
auditLogger.withStepCategory("invocation").withEntity("ip")
    .withStepStatus(Statuses.ENTITY.SUCCESS)
    // .withWorkflowInfo("Request Completed")
    .withRecordAuditFlag(false)
    .build().
    generateAuditlog();
