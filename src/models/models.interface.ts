import MongoLibrary from "../helpers/mongolib";

interface UserModelType {
    mongodb: MongoLibrary
}

interface AuthModelType {
    mongodb: MongoLibrary
}

export {
    UserModelType,
    AuthModelType
}