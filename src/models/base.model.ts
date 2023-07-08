import { ObjectId } from "mongodb";

class BaseModel {
    constructor(){

    }

    toMongoObjectId(id: ObjectId | string){
        let objectId = id + ''

        return new ObjectId(id)
    }
}

export = BaseModel