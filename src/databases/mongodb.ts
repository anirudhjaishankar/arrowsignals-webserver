import { MongoClient } from "mongodb";
import config from "../configs/config";

const mongodbUrl: string = config.mongodb_url || ''
const mongoClient = new MongoClient(mongodbUrl)

mongoClient.connect()

mongoClient.addListener('connectionCreated', (e) => {
    console.log(`Connected to MongoDB: ${config.mongodb_name} at ${e.address} on ${e.time}`)
})

mongoClient.addListener('connectionClosed', () => {
    console.log("Connection to MongoDB Closed")
})

let mongoDatabase = mongoClient.db(config.mongodb_name)

export {
    mongoDatabase,
    mongoClient
}