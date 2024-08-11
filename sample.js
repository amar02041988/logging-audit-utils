process.env.LOG_LEVEL = 'info';
process.env.COMPONENT = 'au-pricing-agent';
const { Logger, AuditLogger, Statuses } = require("../logging-audit-utils");

const crypto = require('crypto');
const correlation_id = crypto.randomUUID();

let options = {
    correlation_id: correlation_id,
}

const logger = Logger.getLogger("sample", options.correlation_id, options.identites);
logger.info("Pricing agent triggered");

const stepConstants = {
    GET_BANK_RATE_FILE: "GET BANK RATES FILE FROM S3",

    GENERATE_BASE_RATES: "GENERATE BASE RATE FILES",
    IMPORT_BASE_RATES: "IMPORT BASE RATES",

    GET_CORE_NONCORE_RESULT_FOR_RUNID_1: "GET CORE AND NON-CORE RESULTS FOR RUN CALC ID 1",
    RUN_CORE_PROFILES_CAL_FOR_RUNID_1: "RUN CAL FOR CORE PROFILES FOR RUN CALC ID 1",
    RUN_NON_CORE_PROFILES_CAL_FOR_RUNID_1: "RUN CAL FOR NON-CORE PROFILES FOR RUN CALC ID 1",

    GET_CORE_NONCORE_RESULT_FOR_RUNID_2: "GET CORE AND NON-CORE RESULTS FOR RUN CALC ID 2",
    RUN_CORE_PROFILES_CAL_FOR_RUNID_2: "RUN CAL FOR CORE PROFILES FOR RUN CALC ID 2",
    RUN_NON_CORE_PROFILES_CAL_FOR_RUNID_2: "RUN CAL FOR NON-CORE PROFILES FOR RUN CALC ID 2",

    GET_ALL_SITE_IDS: "GET ALL SITE IDS FROM CORP DB",
    EXCLUDE_SITE_IDS: "EXCLUDE REQUIRED SITE IDS",
    QUEUE_RATES_FOR_SITE: "SITE ENTRIES INSERTED IN THE SITE MANAGER DATABASE"
}

const stepCategoryConstants = {
    GETTING_COMPETITORS_RATES: "GET COMPETOTORS RATES",
    RUN_PRICING_MODEL: "RUN PRICING MODEL MACRO",
    APPLY_MARGIN: "APPLY MARGIN BY CALLING VARIOUS STORED PROCS",
    DISTRIBUTE_RATES: "QUEUE THE SITES IN TVX SITE MANAGER FOR PUSHING RATES",
    RUN_RATE_SHEET_MODEL: "GENERATE REQUIRED REPORT",
    ARCHIVE_IN_S3: "ARCHIVE ALL THE GENERATED OUTPUTS IN S3",
    ARCHIVE_IN_ONEDRIVE: "ARCHIVE ALL THE GENERATED OUTPUTS IN S3"
}

const auditLogger = new AuditLogger.Builder(logger, options);
auditLogger.withStepCategory(stepCategoryConstants.RUN_PRICING_MODEL).withStep(stepConstants.GET_BANK_RATE_FILE)
    .withStepStatus(Statuses.ENTITY.STARTED)
    .withWorkflowInfo("Getting bank rates scrapped file")
    .build().generateAuditlog();
