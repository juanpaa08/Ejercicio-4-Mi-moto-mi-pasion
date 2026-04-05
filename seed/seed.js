require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const seedFilePath = path.join(__dirname, 'seed.json');
const tableName = process.env.DYNAMODB_TABLE || 'PartesMoto';
const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local'
  }
});

const documentClient = DynamoDBDocumentClient.from(client);

async function seed() {
  const items = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('seed.json debe contener un arreglo con elementos para insertar.');
  }

  await documentClient.send(
    new BatchWriteCommand({
      RequestItems: {
        [tableName]: items.map((item) => ({
          PutRequest: {
            Item: item
          }
        }))
      }
    })
  );

  console.log(`Se insertaron ${items.length} partes en ${tableName}.`);
}

seed().catch((error) => {
  console.error('Fallo al sembrar DynamoDB local:', error);
  process.exitCode = 1;
});
