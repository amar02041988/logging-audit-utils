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
    try {
        let params = JSON.parse(label);
        
        // Create the base log object
        let logObject = {
            level: level,
            timestamp: timestamp,
            correlationId: params.correlationId,
            component: params.component,
            filename: params.filename,
            partner: params.identites.partner,
            customer: params.identites.customer,
            tenantId: params.identites.tenantId,
            message: parseElement(message)
        };

        // Add any additional fields from options
        Object.keys(params).forEach(key => {
            if (key !== 'identites' && key !== 'filename' && key !== 'component' && key !== 'correlationId') {
                logObject[key] = params[key];
            }
        });

        // Remove undefined fields
        Object.keys(logObject).forEach(key => {
            if (logObject[key] === 'undefined' || logObject[key] === undefined) {
                delete logObject[key];
            }
        });

        return JSON.stringify(logObject);
    } catch (error) {
        // If anything fails, return a safe fallback with the original message
        return JSON.stringify({
            level: level,
            timestamp: timestamp,
            message: message,
            error: "Error formatting log message"
        });
    }
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
    options = !options ? {} : options;

    // Create base params with required fields
    const params = { 
        "component": component, 
        "filename": filename, 
        "correlationId": correlationId
    };

    // Add all options fields to params except 'component' which is already handled
    Object.keys(options).forEach(key => {
        if (key !== 'component') {
            params[key] = options[key];
        }
    });

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
        identities: identities,
        ...options  // Spread all options into logger.params
    };

    return logger;
};

function parseElement(message) {
    try {
        if (message === null || message === undefined) {
            return { description: 'null or undefined message' };
        }
        
        if (typeof message === 'object') {
            if (message instanceof Error) {
                return {
                    description: message.message,
                    stack: message.stack
                };
            }
            return message;
        }
        
        if (typeof message === 'string') {
            if (isJson(message)) {
                return JSON.parse(message);
            }
            return { description: message };
        }
        
        return { description: String(message) };
    } catch (ex) {
        return { description: String(message) };
    }
}

function isJson(message) {
    if (typeof message !== 'string') return false;
    try {
        JSON.parse(message);
        return true;
    } catch (ex) {
        return false;
    }
}
