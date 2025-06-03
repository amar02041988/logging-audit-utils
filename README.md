# Logging Audit Utils

A comprehensive logging and audit utility for Node.js applications that provides structured logging with Winston and audit logging capabilities. This utility helps in maintaining consistent logging patterns and audit trails across applications.

## Features

- Structured logging using Winston
- Audit logging with mandatory and optional attributes
- Support for correlation IDs and request tracing
- Dynamic attribute management
- Sensitive data handling
- Configurable log levels
- Support for different environments (development, production)

## Installation

```bash
npm install logging-audit-utils
```

## Requirements

- Node.js >= 12.0.0
- Winston >= 3.8.2

## Usage

### Basic Logger Setup

```javascript
const { Logger } = require('logging-audit-utils');

// Set log level (optional)
process.env.LOG_LEVEL = 'info';

// Set component name (optional)
process.env.COMPONENT = 'your-component-name';

// Create logger instance
const options = {
    correlation_id: 'your-correlation-id',
    identities: {
        customer: 'customer-id',
        partner: 'partner-id'
    }
};

const logger = Logger.getLogger('filename', options.correlation_id, options.identities);

// Use logger
logger.info('Your log message');
logger.error('Error message', { error: new Error('Something went wrong') });
```

### Audit Logger Setup

```javascript
const { Logger, AuditLogger, Statuses } = require('logging-audit-utils');

// Create base logger first
const logger = Logger.getLogger('filename', correlationId, identities);

// Create audit logger
const auditLogger = new AuditLogger.Builder(logger, options)
    .withStepCategory('invocation')
    .withEntity('entity-name')
    .withStepStatus(Statuses.ENTITY.STARTED)
    .withWorkflowInfo('Workflow information')
    .withRecordAuditFlag(true)
    .withProjectCode('project-code')
    .withRegion('region')
    .withCountry('country')
    .withClientId('client-id')
    .build();

// Generate audit log
auditLogger.generateAuditlog();
```

## API Reference

### Logger

The base logger class that provides structured logging capabilities.

#### Methods

- `Logger.getLogger(filename, correlationId, identities, optionalAttributes)`: Creates a new logger instance
  - `filename`: Name of the file/module
  - `correlationId`: Unique identifier for request tracing
  - `identities`: Object containing customer and partner information
  - `optionalAttributes`: (Optional) Additional attributes that will be included in every log message

Example with optional attributes:
```javascript
const { Logger } = require('logging-audit-utils');

// Basic usage
const logger = Logger.getLogger('handler', 'corr-123', {
    partner: 'partner',
    customer: 'customer'
});

// With optional attributes
const logger = Logger.getLogger('handler', 'corr-123', {
    partner: 'partner',
    customer: 'customer'
}, {
    name: 'name',
    environment: 'production',
    serviceName: 'auth-service',
    customField: 'value'
});

// These optional attributes will be automatically included in all log messages
logger.info('User logged in');  // Will include name, environment, serviceName, customField
logger.error('Error occurred'); // Will include name, environment, serviceName, customField
```

### AuditLogger

Provides audit logging capabilities with support for mandatory and optional attributes.

#### Builder Methods

- `withProjectCode(projectCode)`: Sets the project code
- `withRegion(region)`: Sets the region
- `withCountry(country)`: Sets the country
- `withClientId(clientId)`: Sets the client ID
- `withApiKeyId(apiKeyId)`: Sets the API key ID
- `withCorrelationId(correlationId)`: Sets the correlation ID
- `withPartner(partner)`: Sets the partner information
- `withCustomer(customer)`: Sets the customer information
- `withStepCategory(stepCategory)`: Sets the step category
- `withStepStatus(stepStatus)`: Sets the step status
- `withEntityStatus(entityStatus)`: Sets the entity status
- `withWorkflowStatus(workflowStatus)`: Sets the workflow status
- `withEntity(entity)`: Sets the entity
- `withWorkflowInfo(workflowInfo)`: Sets the workflow information
- `withHeader(header)`: Sets the header information
- `withEvent(event)`: Sets the event information
- `withTest(isTest)`: Sets test flag
- `withError(error)`: Sets error information
- `withSenstiveData(isSenstiveData)`: Sets sensitive data flag
- `withRecordAuditFlag(isRecordAuditFlag)`: Sets record audit flag
- `withRecordAuditQuery(recordAuditQuery)`: Sets record audit query

#### Mandatory Attributes

When `recordAuditFlag` is set to `true`, the following attributes are mandatory:
- `projectCode`
- `component`

Additionally, either `partner` and `customer` or `clientId` must be set.

### Statuses

Predefined status constants for use with audit logging.

```javascript
const { Statuses } = require('logging-audit-utils');

// Available statuses
Statuses.ENTITY.STARTED
Statuses.ENTITY.SUCCESS
// ... other statuses
```

## Configuration

### Environment Variables

- `LOG_LEVEL`: Set the logging level (default: 'info')
- `COMPONENT`: Set the component name

### Log Levels

- error
- warn
- info
- debug

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License

## Author

Amar Panigrahy

## Repository

[GitHub Repository](https://github.com/amar02041988/logging-audit-utils) 
