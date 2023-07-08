// importing dependencies here
import { authService, userService } from "../services/index"

// importing all controllers here
import AuthController from "./auth.controller";
import UserController from "./user.controller";

// creating all the controller instances here
const authController = new AuthController({ authService, userService })
const userController = new UserController({ userService })

export {
    authController, userController
}