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
        EVALUATION_ERROR: "evaluation_error",
        EVALUATION_SUCCESS: "evaluation_success",
        STAGING_STARTED: "staging_started",
        STAGING_ERROR: "staging_error",
        STAGING_SUCCESS: "staging_success",
        POST_STAGING_STARTED: "post_stating_started",
        POST_STAGING_ERROR: "post_stating_error",
        POST_STAGING_SUCCESS: "post_staging_success",
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