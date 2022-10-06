class AuditLogger {

    constructor(builder) {
        this.logger = builder.logger;
        this.dateTime = builder.dateTime;

        this.component = builder.component;
        this.filename = builder.filename;
        this.customer = builder.customer;
        this.partner = builder.partner;

        this.stepCategory = builder.stepCategory;

        this.workflowStatus = builder.workflowStatus;
        this.stepStatus = builder.stepStatus;
        this.entityStatus = builder.entityStatus;

        this.entity = builder.entity;
        this.workflowInfo = builder.workflowInfo;

        this.event = builder.event;
        this.header = builder.header;

        this.error = builder.error;
        this.test = builder.test;
        this.recordAuditQuery = builder.recordAuditQuery;
        this.recordAuditFlag = builder.recordAuditFlag || false;
        this.isSenstiveData = builder.isSenstiveData || false;

        this.options = builder.options;
    }

    static get Builder() {
        class Builder {
            constructor(logger, options) {
                if (!logger) {
                    throw new Error("Missing Logger");
                }

                this.logger = logger;
                this.options = options;

                const params = logger.params

                this.component = params.component;
                this.filename = params.filename;
                this.correlationId = params.correlationId;

                const identities = params.identities;
                this.customer = identities.customer;
                this.partner = identities.partner;

                this.dateTime = new Date().toISOString();
            }

            withCorrelationId(correlationId) {
                this.correlationId = correlationId;
                return this;
            }
            withPartner(partner) {
                this.partner = partner;
                return this;
            }
            withCustomer(customer) {
                this.customer = customer;
                return this;
            }
            withStepCategory(stepCategory) {
                this.stepCategory = stepCategory;
                return this;
            }
            withStepStatus(stepStatus) {
                this.stepStatus = stepStatus;
                return this;
            }
            withEntityStatus(entityStatus) {
                this.entityStatus = entityStatus;
                return this;
            }
            withWorkflowStatus(workflowStatus) {
                this.workflowStatus = workflowStatus;
                return this;
            }
            withEntity(entity) {
                this.entity = entity;
                return this;
            }
            withWorkflowInfo(workflowInfo) {
                this.workflowInfo = workflowInfo;
                return this;
            }
            withHeader(header) {
                this.header = header;
                return this;
            }
            withEvent(event) {
                this.event = event;
                return this;
            }
            withTest(isTest) {
                this.isTest = isTest;
                return this;
            }
            withError(error) {
                this.error = error;
                return this;
            }
            withSenstiveData(isSenstiveData) {
                this.isSenstiveData = isSenstiveData;
                return this;
            }
            withRecordAuditFlag(isRecordAuditFlag) {
                this.recordAuditFlag = isRecordAuditFlag;
                return this;
            }
            withRecordAuditQuery(recordAuditQuery) {
                this.recordAuditQuery = recordAuditQuery;
                return this;
            }


            build() {
                this.logger.debug(`Started object building`);
                return new AuditLogger(this);
            }
        }

        return Builder;
    }

    toAuditMessage() {
        return {
            dateTime: this.dateTime,
            correlationId: this.correlationId,
            component: this.component,
            filename: this.filename,
            customer: this.customer,
            partner: this.partner,
            stepCategory: this.stepCategory,
            stepStatus: this.stepStatus,
            entity: this.entity,
            entityStatus: this.entityStatus,
            workflowInfo: this.workflowInfo,
            workflowStatus: this.workflowStatus,
            error: this.error
        };
    }
    generateAuditlog() {
        try {
            console.log(JSON.stringify(this.toAuditMessage()));
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = { AuditLogger };
