const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'PartesMoto';
const OFFLINE_ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

const clientConfig = process.env.IS_OFFLINE
  ? {
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: OFFLINE_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local'
      }
    }
  : {
      region: process.env.AWS_REGION || 'us-east-1'
    };

const documentClient = DynamoDBDocumentClient.from(new DynamoDBClient(clientConfig));

async function createParte(parte) {
  await documentClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: parte
    })
  );

  return parte;
}

async function getPartesByTipo(tipo) {
  const result = await documentClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'TipoIndex',
      KeyConditionExpression: 'tipo = :tipo',
      ExpressionAttributeValues: {
        ':tipo': tipo
      }
    })
  );

  return result.Items || [];
}

module.exports = {
  createParte,
  getPartesByTipo
};
