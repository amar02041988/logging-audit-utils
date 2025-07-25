'use strict';

const { SendMessageCommand, SQSClient } = require("@aws-sdk/client-sqs");
const sqsClient = new SQSClient({});
const ConsoleLogger = require('./ConsoleLogger.js');
const logger = new ConsoleLogger();

const sendMessage = async (queueUrl, message) => {
    let params = {
        QueueUrl: queueUrl,
        MessageBody: message
    };

    const command = new SendMessageCommand(params);

    const response = await sqsClient.send(command);
    logger.debug(`sendMessage response for ${queueUrl}: ${JSON.stringify(response)}`);
    return response;
}

module.exports = { sendMessage };