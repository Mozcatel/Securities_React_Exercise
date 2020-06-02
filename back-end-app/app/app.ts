import express from "express";
import { Application } from "express";
import IDbClient from "../database/dbclient";
import cors from "cors";
import compression from "compression";

export class App {

    public app: Application;
    public port: number;
    public dbClient: IDbClient;

    constructor(port: number, dbClient: IDbClient) {
        this.app = express();
        this.port = port || 8080;
        this.dbClient = dbClient || undefined;

        this.dbClient.connect();
        this.initServer();
    }


    public initServer() {

        // add middelware here
        this.app.use(cors());
        this.app.use(compression());

        // add routes here
        this.app.get("/", (req, res) => {
            res.redirect(301, "/securities")
        });

        this.app.get("/securities", async (req, res) => {
            const data = await this.dbClient.getAll();
            res.send(data);
        });

    }

    public listen() {

        this.app.listen(this.port, () =>
            console.log(`Server started! Listening at port:${this.port}`));

    }
}

export default App;
