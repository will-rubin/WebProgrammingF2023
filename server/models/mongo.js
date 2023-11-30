const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri, {});

async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(MONGO_DB_NAME);
}

module.exports = {
    connect,
    ObjectId
};