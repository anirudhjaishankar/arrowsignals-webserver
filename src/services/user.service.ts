import { ObjectId } from "mongodb"
import { UserServiceType } from "./service.interface"

class UserService {
    // declaring all the dependency related data members
    userModel

    constructor({ userModel }: UserServiceType){
        this.userModel = userModel
    }

    async fetchUserById(id: string | ObjectId){
        return await this.userModel.fetchUserById(id)
    }

    async fetchUserByMailId(emailId: string){
        return await this.userModel.fetchUserByMailId(emailId)
    }

    async fetchUserByPhone(phoneNumber: string){
        return await this.userModel.fetchUserByPhone(phoneNumber)
    }
}

export = UserService