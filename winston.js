var winston = require('winston');
var appRoot = require('app-root-path');
const find = require('find');

const {
    createLogger,
    format
} = winston;
const {
    combine,
    timestamp,
    label,
    printf
} = format;

var logConfig = undefined;

//console.log("Root path " + appRoot.path);

let files = find.fileSync(/\log-config.js$/, appRoot.path);
console.log(JSON.stringify(files));

if (files) {
    if (files && files.length > 0) {
        console.log('log-config.js file found in current base path');
        logConfig = require(files[0]);
    } else {
        console.log('External log-config.js file not found, loading default');
        logConfig = require('./log-config.js');
    }
}

var transportsArr = [];
console.log("Loading winston transports");
for (let i = 0; i < logConfig.appenders.length; i++) {
    var appender = logConfig.appenders[i];
    transportsArr.push(new appender.type(appender.options));
}

const addTraceId = printf(({
    level,
    message,
    label,
    timestamp
}) => {
    let params = JSON.parse(label);
    let pattern = (logConfig.pattern.replace('${label}', params.filename).replace('${level}', level).replace('${message}', parseElement(message)).replace('${timestamp}', timestamp).replace('${component}', params.component).replace('${correlationId}', params.correlationId).replace('${partner}', params.identites.partner).replace('${customer}', params.identites.customer));
    pattern = JSON.parse(pattern);

    if (pattern.partner == 'undefined') delete pattern.partner;
    if (pattern.customer == 'undefined') delete pattern.customer;

    return JSON.stringify(pattern);
});

// instantiate a new Winston Logger with the settings defined above
exports.getLogger = (filename, correlationId, identities, options) => {
    let component = undefined;
    if (options && options.component) {
        component = options.component;
    } else {
        component = process.env.COMPONENT;
    }

    if (!component) {
        throw new Error("Missing component in logger");
    }
    if (!filename) {
        throw new Error("Missing filename in logger");
    }

    identities = !identities ? {} : identities;

    const params = { "component": component, "filename": filename, "correlationId": correlationId };
    params.identites = identities;

    const logger = createLogger({
        levels: winston.config.syslog.levels,
        format: combine(
            label({
                label: JSON.stringify(params)
            }),
            timestamp(),
            addTraceId
        ),
        transports: transportsArr,
        exitOnError: false
    });

    logger.params = {
        correlationId: correlationId,
        component: component,
        filename: filename,
        identities: identities
    };

    return logger;
};

function parseElement(message) {
    try {
        if (isJson(message))
            return message;
        else
            return JSON.stringify({
                description: message
            });
    } catch (ex) {
        return message;
    }
}

function isJson(message) {
    let isJson = false;
    try {
        let _message = JSON.parse(message);
        isJson = true;
        return isJson;
    } catch (ex) {
        return isJson;
    }
}
