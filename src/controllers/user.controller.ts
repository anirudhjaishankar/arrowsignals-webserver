import { Request } from "express"

import BaseValidator from "../helpers/base-validator"
import * as ErrorClasses from '../helpers/error-classes'
import { UserControllerType } from "./controller.interface"

class UserController extends BaseValidator {
    // declaring all the dependency related data members
    userService

    constructor({ userService }: UserControllerType){
        super()
        this.userService = userService
    }

    fetchUserByMailId = async (request: Request) => {
        let w = 'UserController.fetchUserByMailId'

        let { q: emailId }: any = request.query

        // validating the email address
        this.isValidEmailAddress(emailId)

        // fetch the user with the given email address
        let userByEmail = await this.userService.fetchUserByMailId(emailId)

        // if user already exists with the given email address
        if(userByEmail){
            return { message: "User already exists with same mail ID", data: { proceed: false } }
        }

        // if user does not exists with the given email address
        return { message: "No user found with the given mail ID", data: { proceed: true } }
    }

    fetchUserByPhoneNumber = async (request: Request) => {
        let w = 'UserController.fetchUserByPhoneNumber'

        let { q: phoneNumber }: any = request.query

        // validating the phone number
        this.isValidPhoneNumber(phoneNumber)

        // fetch the user with the given phone number
        let userByPhoneNumber = await this.userService.fetchUserByPhone(phoneNumber)

        // if user already exists with the given phone number
        if(userByPhoneNumber){
            return { message: "User already exists with same phone number", data: { proceed: false } }
        }

        // if user does not exists with the given phone number
        return { message: "No user found with the given phone number", data: { proceed: true } }
    }
}

export = UserController