require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:2717/";

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client=await MongoClient.connect(uri,options)
        } catch (err) {
            console.log(err)
        }
    }
    return client;
}

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };