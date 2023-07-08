import { UserModelType } from "./models.interface"
import { MONGO_COLLECTIONS } from "../helpers/constants"
import { ObjectId } from "mongodb"
import BaseModel from "./base.model"

class UserModel extends BaseModel {
    // declaring all the dependency related data members
    mongodb
    
    constructor({ mongodb }: UserModelType) {
        super()
        this.mongodb = mongodb
    }

    async fetchUserById(id: string | ObjectId){
        let query = {
            _id: this.toMongoObjectId(id)
        }

        return await this.mongodb.findOne(MONGO_COLLECTIONS.USER, query)
    }

    async fetchUserByMailId(emailId: string){
        let query = {
            email_id: emailId
        }

        return await this.mongodb.findOne(MONGO_COLLECTIONS.USER, query)
    }

    async fetchUserByPhone(phoneNumber: string){
        let query = {
            phone_number: phoneNumber
        }

        return await this.mongodb.findOne(MONGO_COLLECTIONS.USER, query)
    }
}

export = UserModel