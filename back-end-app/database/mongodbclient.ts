
import { MongoClient } from "mongodb";
import IDbClient from "./dbclient";

class MongoDbClient implements IDbClient {
    public connection!: MongoClient;
    private connectionString: string;
    private database: string;
    private collection: string;

    constructor(options: {connectionString: string, database: string, collection: string}) {
        this.connectionString = options.connectionString;
        this.database = options.database;
        this.collection = options.collection;
    }

    public async connect(): Promise<void> {
        this.connection = await MongoClient.connect(this.connectionString, { useUnifiedTopology: true });
        console.log("Mongo Client has connected");
    }


    public async getAll(): Promise<any[]> {
        return this.connection
            .db(this.database)
            .collection(this.collection)
            .find({})
            .toArray();
    }

    public close(): void {
        this.connection.close(true);
    }
}

export default MongoDbClient