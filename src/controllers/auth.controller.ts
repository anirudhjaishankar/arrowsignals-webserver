import { Request } from "express"

import BaseValidator from "../helpers/base-validator"
import * as ErrorClasses from '../helpers/error-classes'
import { RegisterUserBody, SendOtpBody, VerifyOtpBody } from "./body.interface"
import { AuthControllerType } from "./controller.interface"
import { OPT_TYPES, SEND_OTP_TO } from "../helpers/constants"

class AuthController extends BaseValidator {
    // declaring all the dependency related data members
    private authService
    private userService

    constructor({ authService, userService }: AuthControllerType) {
        super()
        this.authService = authService
        this.userService = userService
    }

    registerUser = async (request: Request) => {
        let w = 'AuthController.registerUser'

        let { name, email_id, phone_number }: RegisterUserBody = request.body

        // doing some basic validation on the request body payload
        this.isValidPhoneNumber(phone_number)
        this.isValidEmailAddress(email_id)

        // registering a new user
        let newlyRegisteredUser = await this.authService.registerNewUser({ name, emailId: email_id, phoneNumber: phone_number })

        // if new user is registered successfully, send the user details as a response
        if (newlyRegisteredUser.acknowledged) {
            let userId = newlyRegisteredUser.insertedId
            let userDetails = await this.userService.fetchUserById(userId)

            return { message: 'New user registered successfully', data: userDetails }
        }

        throw new ErrorClasses.CustomError({ m: 'Failed to register a new user', w })
    }

    sendOtp = async (request: Request) => {
        let w = 'AuthController.sendOtp'

        let { to, type, user_id }: SendOtpBody = request.body

        // validating the otp type
        if (!OPT_TYPES.includes(type)) {
            throw new ErrorClasses.InvalidUserInput({ m: `Invalid otp type: ${type}`, w })
        }

        // validating the otp destination(receiver end) type
        if (to !== SEND_OTP_TO.EMAIL && to !== SEND_OTP_TO.PHONE) {
            throw new ErrorClasses.InvalidUserInput({ m: `Invalid otp destination: ${to}`, w })
        }

        // validating the user_id for whom the otp needs to be send
        this.isValidMongoObjectId(user_id)

        return await this.authService.generateOtpAndSendToUser({ sendOtpTo: to, typeOfOtp: type, userId: user_id })
    }

    verifyOtp = async (request: Request) => {
        let w = 'AuthController.verifyOtp'

        let { from, type, user_id, otp }: VerifyOtpBody = request.body

        // checking if otp is present or not
        // otp is mandatory for verification process
        if (!otp) {
            throw new ErrorClasses.InvalidUserInput({ m: `OTP is required for verification process`, w })
        }

        // validating the otp type
        if (!OPT_TYPES.includes(type)) {
            throw new ErrorClasses.InvalidUserInput({ m: `Invalid otp type: ${type}`, w })
        }

        // validating the otp source(receiver end) type
        if (from !== SEND_OTP_TO.EMAIL && from !== SEND_OTP_TO.PHONE) {
            throw new ErrorClasses.InvalidUserInput({ m: `Invalid otp source: ${from}`, w })
        }

        // validating the user_id for whom the otp was send
        this.isValidMongoObjectId(user_id)

        return await this.authService.verifyOtp({ otp, receivedOtpFrom: from, typeOfOtp: type, userId: user_id })
    }
}

export = AuthController