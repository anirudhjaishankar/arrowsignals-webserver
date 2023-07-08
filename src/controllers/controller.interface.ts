import AuthService from "../services/auth.service"
import UserService from "../services/user.service"

interface UserControllerType {
    userService: UserService
}

interface AuthControllerType {
    authService: AuthService,
    userService: UserService
}

export {
    AuthControllerType, UserControllerType
}