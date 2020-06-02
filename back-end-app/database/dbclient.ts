
export default interface IDbClient{
    connect() : Promise<void>;
    getAll() : Promise<any[]>;
}