process.env.LOG_LEVEL = 'info';
process.env.COMPONENT = 'test-logger';
const { Logger, AuditLogger, Statuses } = require("../../logging-audit-utils");

const crypto = require('crypto');
const correlation_id = crypto.randomUUID();

describe('AuditLogger', () => {
    it('It should print the Audit log and exit without any error', () => {
        // Mock logger with required parameters


        let options = {
            correlation_id: correlation_id,
            identites: {
                customer: "test-cutomer",
                partner: "test-partner"
            }
        }

        const logger = Logger.getLogger("sample", options.correlation_id, options.identites);
        logger.info("Sample Log");

        const auditLogger = new AuditLogger.Builder(logger, options);
        auditLogger.withStepCategory("invocation").withEntity("ip")
            .withStepStatus(Statuses.ENTITY.STARTED)
            .withWorkflowInfo("Request Received")
            .withRecordAuditFlag(true)
            .withProjectCode("intel")
            .withRegion("eu")
            .withCountry("it")
            .build().generateAuditlog();

        auditLogger.withStepCategory("invocation").withEntity("ip")
            .withStepStatus(Statuses.ENTITY.SUCCESS)
            .withWorkflowInfo("Request Completed")
            .withRecordAuditFlag(false)
            .build().
            generateAuditlog();

    });
});
