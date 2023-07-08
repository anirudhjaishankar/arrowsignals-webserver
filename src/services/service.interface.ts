import AuthModel from "../models/auth.model"
import UserModel from "../models/user.model"
import UserService from "../services/user.service"

interface UserServiceType {
    userModel : UserModel
}

interface AuthServiceType {
    authModel : AuthModel,
    userService: UserService
}


export {
    UserServiceType, AuthServiceType
}