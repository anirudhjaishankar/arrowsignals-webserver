import { MongoLibraryType } from "./helpers.interface"
import { AggregateOptions, CountDocumentsOptions, Document, FindOptions, UpdateOptions } from "mongodb"

class MongoLibrary {
    database
    client

    constructor({ mongoDatabase, mongoClient }: MongoLibraryType){
        this.database = mongoDatabase
        this.client = mongoClient
    }

    createCollection(collectionName: string){
        return this.database.createCollection(collectionName)
    }

    // insert one document into the given collection
    insertOne(collection_name: string, data: object){
        let collection = this.database.collection(collection_name)

        return collection.insertOne(data)
    }

    // insert many document into the given collection
    insertMany(collection_name: string, data: object[]){
        let collection = this.database.collection(collection_name)

        return collection.insertMany(data)
    }

    // returns all the documents that matches the query in an array
    findAll(collection_name: string, query: object = {}, { projection = {}, sort = {}, skip = 0, limit = 0 }: FindOptions){
        let collection = this.database.collection(collection_name)
        
        return collection.find(query, { sort, projection, skip, limit }).toArray()
    }

    // return a single document object that matches the query
    findOne(collection_name: string, query: object = {}, { projection = {}, sort = {} }: FindOptions = {}){
        let collection = this.database.collection(collection_name)
        
        return collection.findOne(query, { projection, sort })
    }

    // update one document in the given collection based on the query
    updateOne(collection_name: string, query: object, update: object, {}: UpdateOptions){
        let collection = this.database.collection(collection_name)

        return collection.updateOne(query, update, {})
    }

    // update many documents in the given collection based on the query
    updateMany(collection_name: string, query: object, update: object, {}: UpdateOptions){
        let collection = this.database.collection(collection_name)

        return collection.updateMany(query, update, {})
    }

    // delete the first document that matches the query
    deleteOne(collection_name: string, query: object){
        if(!query){
            throw new Error('Delete command should not be executed without proper query')
        }

        let collection = this.database.collection(collection_name)
        console.log(`Last executed deleteOne command on collection - [${collection_name}] with query - "${JSON.stringify(query)}"`)
        
        return collection.deleteOne(query)
    }

    // delete all the documents that matches the query
    deleteMany(collection_name: string, query: object){
        if(!query){
            throw new Error('Delete command should not be executed without proper query')
        }

        let collection = this.database.collection(collection_name)
        console.log(`Last executed deleteMany command on collection - [${collection_name}] with query - "${JSON.stringify(query)}"`)
        
        return collection.deleteMany(query)
    }

    aggregate(collection_name: string, pipelines: Document[], {}: AggregateOptions){
        let collection = this.database.collection(collection_name)

        return collection.aggregate(pipelines, {}).toArray()
    }

    count(collection_name: string, query: object = {}, {}: CountDocumentsOptions){
        let collection = this.database.collection(collection_name)

        return collection.countDocuments(query, {})
    }

    distinct(collection_name: string, fieldName: string, query: object = {}){
        let collection = this.database.collection(collection_name)

        return collection.distinct(fieldName, query)
    }
}

export = MongoLibrary