process.env.LOG_LEVEL = 'info';
process.env.COMPONENT = 'sample-component';
const { Logger, AuditLogger, Statuses } = require("../logging-audit-utils");

const crypto = require('crypto');
const correlation_id = crypto.randomUUID();

let options = {
    correlation_id: correlation_id,
    identites: {
        customer: "ai-user"
    },
    queueUrl: "https://sqs.eu-west-1.amazonaws.com/259398755136/dev-pm-audit-logs"
}

const logger = Logger.getLogger("direct-push-to-organizer-queue", options.correlation_id, options.identites, { country: "in", entity: "business-analyst", projectCode: "sample-project", region: "asia" });

let auditLogger = new AuditLogger.Builder(logger, options);

console.log(`----------------------------------------------`);
auditLogger.withStepCategory("invocation")
    .withStepStatus(Statuses.ENTITY.STARTED)
    .withWorkflowInfo("Request Received")
    .withSenstiveData(true)
    .withIsPushInQueue(true)
    .build().
    generateAuditlog();

console.log(`----------------------------------------------`);

