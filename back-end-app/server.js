"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app/app"));
var mongodbclient_1 = __importDefault(require("./database/mongodbclient"));
var dotenv_1 = __importDefault(require("dotenv"));
var minimist_1 = __importDefault(require("minimist"));
var argv = minimist_1.default(process.argv.slice(2));
dotenv_1.default.config({ path: __dirname + ("/.env." + (process.env.NODE_ENV || 'development')) });
console.log(process.env.DB_DATABASE_CONNSTRING);
var dbClient = new mongodbclient_1.default({
    connectionString: process.env.DB_DATABASE_CONNSTRING || '',
    database: process.env.DB_DATABASE_NAME || '',
    collection: process.env.DB_COLLECTION_NAME || ''
});
var app = new app_1.default(argv.port || argv.p, dbClient);
app.listen();
// Cleanup on exit
process.on("SIGINT", function () { return dbClient.close(); });
