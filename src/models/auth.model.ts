import { ObjectId } from "mongodb"

import { AuthModelType } from "./models.interface"
import { MONGO_COLLECTIONS, USER_ACTIONS } from "../helpers/constants"
import { getCurrentTimestamp } from "../utils/timestamp.util"
import BaseModel from "./base.model"

class AuthModel extends BaseModel {
    // declaring all the dependency related data members
    mongodb
    
    constructor({ mongodb }: AuthModelType) {
        super()
        this.mongodb = mongodb
    }

    async createNewUser({ name, emailId, phoneNumber }: { name: string, emailId: string, phoneNumber: string }){
        let currentTimestamp = getCurrentTimestamp()

        let newUserObject = {
            name: name,
            email_id: emailId,
            phone_number: phoneNumber,
            identity_verified: false,
            role: null,
            is_active: false,
            is_deleted: false,
            created_at: currentTimestamp,
            history: [{
                action: USER_ACTIONS.REGISTERED,
                action_at: currentTimestamp
            }]
        }

        return await this.mongodb.insertOne(MONGO_COLLECTIONS.USER, newUserObject)
    }

    async generateOtpForUser({ otpObject, userId }: { otpObject: any, userId: ObjectId }){
        let newOtpObejct = {
            ...otpObject,
            user_id: this.toMongoObjectId(userId),
            created_at: getCurrentTimestamp(),
            is_deleted: false
        }

        return await this.mongodb.insertOne(MONGO_COLLECTIONS.AUTH_OTP, newOtpObejct)
    }

    async getLastGeneratedOtp({ userId, type, source }: any){
        let query = {
            user_id: this.toMongoObjectId(userId),
            type,
            source,
            is_deleted: false
        }

        let sort: any = {
            _id: -1
        }

        return await this.mongodb.findOne(MONGO_COLLECTIONS.AUTH_OTP, query, { sort })
    }
}

export = AuthModel