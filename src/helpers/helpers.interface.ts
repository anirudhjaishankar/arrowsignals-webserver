import { Db, MongoClient } from "mongodb";

interface MongoLibraryType {
    mongoDatabase: Db,
    mongoClient: MongoClient
}

export {
    MongoLibraryType
}