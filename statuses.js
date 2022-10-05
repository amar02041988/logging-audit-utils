const statuses = {
    STEP: {
        ENQUEUED: "enqueued",
        STARTED: "started",
        SUCCESS: "success",
        ERROR: "error"
    },
    ENTITY: {
        STARTED: "started",
        BEGIN: "begin",
        STAGED: "staged",
        COMPLETED: "completed",
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