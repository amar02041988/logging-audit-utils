# logging-audit-utils

[![npm version](https://badge.fury.io/js/logging-audit-utils.svg)](https://badge.fury.io/js/logging-audit-utils)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/dt/logging-audit-utils.svg)](https://www.npmjs.com/package/logging-audit-utils)

A comprehensive logging and audit utility for Node.js applications that provides structured logging with Winston and audit logging capabilities. This utility helps in maintaining consistent logging patterns and audit trails across applications.

## Table of Contents

- [Quick Start](#quick-start)
- [Why logging-audit-utils?](#why-logging-audit-utils)
- [Features](#features)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Migration Guide](#migration-guide)
- [Troubleshooting](#troubleshooting)
- [Requirements](#requirements)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Support](#support)

## Quick Start

```bash
npm install logging-audit-utils
```

```javascript
const { Logger, AuditLogger, Statuses } = require('logging-audit-utils');

// Create logger with optional attributes
const logger = Logger.getLogger('handler', 'corr-123', {
    partner: 'partner',
    customer: 'customer'
}, {
    name: 'name',
    environment: 'production',
    serviceName: 'auth-service',
    customField: 'value'
});

// Basic logging
logger.info('User logged in');
logger.error('Error occurred', { error: new Error('Something went wrong') });

// Audit logging
const auditLogger = new AuditLogger.Builder(logger)
    .withStepCategory('invocation')
    .withEntity('user')
    .withStepStatus(Statuses.ENTITY.STARTED)
    .withRecordAuditFlag(true)
    .withProjectCode('project-code')
    .build();

auditLogger.generateAuditlog();
```

## Why logging-audit-utils?

- **Consistent Logging**: Enforces a standard logging format across your entire application
- **Audit Trail**: Built-in support for audit logging with mandatory attributes
- **Dynamic Attributes**: Flexible attribute system that adapts to your needs
- **Correlation**: Easy request tracing with correlation IDs
- **Security**: Built-in support for handling sensitive data
- **Production Ready**: Battle-tested in production environments
- **Zero Configuration**: Works out of the box with sensible defaults

## Features

- 📝 Structured logging using Winston
- 🔍 Audit logging with mandatory and optional attributes
- 🔗 Support for correlation IDs and request tracing
- 🎯 Dynamic attribute management
- 🔒 Sensitive data handling
- ⚙️ Configurable log levels
- 🌍 Support for different environments

## API Reference

### Logger

```javascript
Logger.getLogger(filename, correlationId, identities, optionalAttributes)
```

Parameters:
- `filename`: Name of the file/module
- `correlationId`: Unique identifier for request tracing
- `identities`: Object containing customer and partner information
- `optionalAttributes`: (Optional) Additional attributes included in every log message

Example:

- Method signature:

Logger.getLogger('filename', 'correlation_id', { identity object }, { **custom parameters** });

Here custom parameter object can contain any number of custo attributes for which there is no **with** style builder function.
custom parameters can also have same name as parameters that are already available with **with** style builder function.
So if you set the value for the same attribute at both the places, i.e custom parameter object and also using **with** style builder function, then **with** style builder function will take the precedence.

Hence, its recommended to put those parameters in custom parameter object which will not change for every audit log statement, rather it will act as one time attribute setup, such as country, projectCode, env, etc.

```javascript
const logger = Logger.getLogger('handler', 'corr-123', {
    partner: 'partner',
    customer: 'customer'
}, {
    name: 'name',
    environment: 'production',
    serviceName: 'auth-service',
    customField: 'value'
});
```

### AuditLogger

```javascript
new AuditLogger.Builder(logger)
    .withEnv("dev")   
    .withMessageType("record_audit_sensitive");
    .withStepCategory(category)
    .withEntity(entity)
    .withStepStatus(status)
    .withRecordAuditFlag(true)
    .withProjectCode(code)
    .build()
```

- Here, env attribute is optional. If not found in getLogger function's custom parameter section which is an object, 
  and if also not found here while setting the builder attribute, then env is not considered. So, if the message type is record_audit or record_audit_sensitive then these logs are saved in S3 bucket. If env was not supplied then logs will not be saved under any env folder rather it will be saved at root.

Mandatory attributes when `recordAuditFlag` is true:
- `projectCode`
- `component`
- Either `partner` and `customer` or `clientId`

### Statuses

```javascript
const { Statuses } = require('logging-audit-utils');

// Available statuses
Statuses.ENTITY.STARTED
Statuses.ENTITY.SUCCESS
Statuses.ENTITY.FAILED
Statuses.WORKFLOW.STARTED
Statuses.WORKFLOW.COMPLETED
Statuses.WORKFLOW.FAILED
```

## Configuration

### Environment Variables

- `LOG_LEVEL`: Set logging level (default: 'info')
- `COMPONENT`: Set component name

### Log Levels

- `error`: Error conditions
- `warn`: Warning conditions
- `info`: Informational messages
- `debug`: Debug messages

## Migration Guide

### From Winston

If you're currently using Winston directly, migration is straightforward:

```javascript
// Before
const winston = require('winston');
const logger = winston.createLogger({...});

// After
const { Logger } = require('logging-audit-utils');
const logger = Logger.getLogger('filename', 'corr-123', {
    partner: 'partner',
    customer: 'customer'
});
```

### From Other Logging Libraries

1. Replace your existing logger initialization with `Logger.getLogger()`
2. Add correlation ID to your logging calls
3. Use the audit logger for audit-related logging
4. Update your log format to match the new structure

## Troubleshooting

### Common Issues

1. **Missing Mandatory Attributes**
   ```
   Error: Setting recordAuditFlag=true, requires mandatory attributes: [projectCode, component]
   ```
   Solution: Ensure all required attributes are set when using `recordAuditFlag`

2. **Logger Not Initialized**
   ```
   Error: Missing Logger
   ```
   Solution: Always provide a logger instance to AuditLogger.Builder

3. **Correlation ID Issues**
   ```
   Error: Invalid correlation ID
   ```
   Solution: Ensure correlation ID is a non-empty string

### Debug Mode

Enable debug mode to see detailed logging information:
```javascript
process.env.LOG_LEVEL = 'debug';
```

## Requirements

- Node.js >= 12.0.0
- Winston >= 3.8.2

## Best Practices

1. Always set a meaningful correlation ID
2. Use appropriate log levels
3. Include relevant context in log messages
4. Set `isSenstiveData` flag for sensitive information
5. Keep component names consistent
6. Use appropriate statuses for audit logs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

ISC License - see the [LICENSE](LICENSE) file for details

## Author

Amar Panigrahy

## Support

For support, please [open an issue](https://github.com/amar02041988/logging-audit-utils/issues) in the GitHub repository. 
