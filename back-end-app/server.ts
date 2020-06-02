import App from './app/app';
import MongoDbClient from './database/mongodbclient';
import dotenv from 'dotenv';
import minimist from 'minimist';

// get arguments
const argv = minimist(process.argv.slice(2));

// get environment configurations
dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV || 'development'}` });

// create database client
const dbClient = new MongoDbClient({
    connectionString: process.env.DB_DATABASE_CONNSTRING || '',
    database: process.env.DB_DATABASE_NAME || '',
    collection: process.env.DB_COLLECTION_NAME || ''
})

// setup our app server
const app = new App(argv.port || argv.p, dbClient);

// start server
app.listen();

// Cleanup on exit
process.on("SIGINT", () => dbClient.close())