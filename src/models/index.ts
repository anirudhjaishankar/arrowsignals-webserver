// importing all dependencies here
import { mongoDatabase, mongoClient } from "../databases/mongodb";
import MongoLibrary from "../helpers/mongolib";

// importing all models here
import AuthModel from "./auth.model";
import UserModel from "./user.model";

// creating all dependency instances
const mongodb = new MongoLibrary({ mongoDatabase, mongoClient })

// creating all the models instances
const authModel = new AuthModel({ mongodb })
const userModel = new UserModel({ mongodb })

// exporting all the model instances
export {
    authModel, userModel
}