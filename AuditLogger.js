class AuditLogger {

    constructor(builder) {
        this.projectCode = builder.projectCode;
        this.region = builder.region;
        this.country = builder.country;

        this.customer = builder.customer;
        this.partner = builder.partner;

        this.clientId = builder.clientId;

        this.apiKeyId = builder.apiKeyId;
        this.logger = builder.logger;
        this.dateTime = builder.dateTime;

        this.component = builder.component;
        this.filename = builder.filename;
        this.correlationId = builder.correlationId;

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
        this.messageType = builder.messageType;
        this.options = builder.options;
    }

    static get Builder() {
        class Builder {
            constructor(logger, options) {
                this.projectCode = undefined;
                this.region = undefined;
                this.coountry = undefined;
                this.apiKeyId = undefined;
                this.clientId = undefined;

                if (!logger) {
                    throw new Error("Missing Logger");
                }

                this.logger = logger;
                this.options = options;

                const params = logger.params;

                this.component = params.component;
                this.filename = params.filename;
                this.correlationId = params.correlationId;

                const identities = params.identities;
                this.customer = identities.customer;
                this.partner = identities.partner;

                // Copy options attributes from logger.params
                Object.keys(params).forEach(key => {
                    if (key !== 'component' && key !== 'filename' && key !== 'correlationId' && key !== 'identities') {
                        this[key] = params[key];
                    }
                });

                this.dateTime = new Date().toISOString();
            }

            withProjectCode(projectCode) {
                this.projectCode = projectCode;
                return this;
            }

            withRegion(region) {
                this.region = region;
                return this;
            }

            withCountry(country) {
                this.country = country;
                return this;
            }

            withClientId(clientId) {
                this.clientId = clientId;
                return this;
            }

            withApiKeyId(apiKeyId) {
                this.apiKeyId = apiKeyId;
                return this;
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

            resolveMessageType() {
                let messageType = "audit";
                if (this.recordAuditFlag) {
                    messageType += "_record";
                }
                if (this.isSenstiveData) {
                    messageType += "_sensitive";
                }
                return messageType;
            }

            build() {
                if (this.recordAuditFlag) {
                    const requiredAttributes = ["projectCode", "component"];
                    for (let attr of requiredAttributes) {
                        if (!this[attr]) {
                            throw new Error(`Setting recordAuditFlag=true, requires mandatory attributes: [${requiredAttributes}]`);
                        }
                    }

                    if (!this.partner && !this.customer && !this.clientId) {
                        throw new Error("Setting recordAuditFlag=true, requires either [partner, customer] or [clientId] to be set");
                    }
                }

                this.messageType = this.resolveMessageType();
                return new AuditLogger(this);
            }
        }

        return Builder;
    }

    toAuditMessage() {
        const message = {
            messageType: this.messageType,
            projectCode: this.projectCode,
            region: this.region,
            country: this.country,
            customer: this.customer,
            partner: this.partner,
            apiKeyId: this.apiKeyId,
            clientId: this.clientId,
            component: this.component,
            dateTime: this.dateTime,
            correlationId: this.correlationId,
            filename: this.filename,
            stepCategory: this.stepCategory,
            stepStatus: this.stepStatus,
            entity: this.entity,
            entityStatus: this.entityStatus,
            workflowInfo: this.workflowInfo,
            workflowStatus: this.workflowStatus,
            error: this.error,
            recordAuditFlag: this.recordAuditFlag
        };

        // Add options attributes from logger.params
        const params = this.logger.params;
        Object.keys(params).forEach(key => {
            if (key !== 'component' &&
                key !== 'filename' &&
                key !== 'correlationId' &&
                key !== 'identities' &&
                !message.hasOwnProperty(key)) {
                message[key] = params[key];
            }
        });

        return message;
    }

    generateAuditlog() {
        try {
            if (!this.isSenstiveData) {
                console.log(JSON.stringify(this.toAuditMessage()));
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = { AuditLogger };
