const statuses = {
    STEP: {
        ENQUEUED: "enqueued",
        STARTED: "started",
        SUCCESS: "success",
        ERROR: "error"
    },
    ENTITY: {
        STARTED: "started",
        EVALUATION_STARTED: "evaluation_started",
        EVALUATION_COMPLETED: "evaluation_completed",
        STAGING_STARTED: "staging_started",
        STAGING_COMPLETED: "staging_completed",
        POST_STAGING_STARTED: "post_stating_started",
        POST_STAGING_COMPLETED: "post_staging_completed",
        SUCCESS: "success",
        ERROR: "error"
    },
    WORKFLOW: {
        STARTED: "started",
        SUCCESS: "success",
        ERROR: "error"
    }

}

module.exports = { statuses }