// importing dependencies here
import { authModel, userModel } from "../models/index"

// importing all services here
import AuthService from "./auth.service";
import UserService from "./user.service";

// creating all the service instances here
const userService = new UserService({ userModel })
const authService = new AuthService({ authModel, userService })

export {
    authService, userService
}