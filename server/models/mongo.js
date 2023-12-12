const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function connect() {
    await client.connect();
    return client.db(MONGO_DB_NAME);
}

module.exports = {
    connect,
    ObjectId
};