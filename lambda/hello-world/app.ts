import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client'
import * as schema from './prisma/schema.prisma';
import * as x from './node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node';
import * as l from './node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node';
 
if (process.env.NODE_ENV !== 'production') {
    console.debug(schema, x, l);
}
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

// const pool = new Pool({
//     user: 'postgres',
//     host: '172.17.0.2',
//     database: 'test',
//     password: '1234',
//     port: 5432, // Porta padrão do PostgreSQL
// });
const prisma = new PrismaClient()

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event.httpMethod)
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    try {
        // const client = await pool.connect();
        // const result = await client.query('SELECT * FROM dishes'); // Substitua sua_tabela pelo nome da tabela no seu banco de dados
        //console.log("\n\n\n\n\n\n\n\n\n----------------------------------------------------", prisma.dishes)
        const items = await prisma.dishes.findMany(); // Substitua 'dish' pelo nome do seu modelo no Prisma
        // const items = result.rows; // Supondo que você queira retornar todas as linhas da consulta

        // client.release();

        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify(items),
        };

        // All log statements are written to CloudWatch
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } catch (err) {
        console.error('Error executing query', err);

        const errorResponse: APIGatewayProxyResult = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error executing query' }),
        };

        return errorResponse;
    }
};
