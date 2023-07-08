import { ObjectId } from "mongodb"
import config from "../configs/config"

import * as ErrorClasses from "../helpers/error-classes"
import { AuthServiceType } from "./service.interface"
import { getRandomNumber } from "../utils/number.util"
import { SEND_OTP_TO } from "../helpers/constants"

class AuthService {
    // declaring all the dependency related data members
    authModel
    userService

    constructor({ authModel, userService }: AuthServiceType){
        this.authModel = authModel
        this.userService = userService
    }

    // function to generate a new OTP of given length
    async generateOTP(length: number = 6): Promise<string>{
        let otp = 0

        for(let i = 0; i < length; i++){
            let digit = getRandomNumber({ start: (i == 0) ? 1 : 0, end: 9 })

            otp = (otp * 10) + digit
        }

        return String(otp)
    }

    async registerNewUser({ name, emailId, phoneNumber }: { name: string, emailId: string, phoneNumber: string }){
        let w = 'AuthService.registerNewUser'

        // check for user already exists with same mail address
        let userByEmail = await this.userService.fetchUserByMailId(emailId)

        if(userByEmail){
            throw new ErrorClasses.CustomError({ m: 'User already exists with same email address', w })
        }
        
        // check for user already exists with same phone number
        let userByPhoneNumber = await this.userService.fetchUserByPhone(phoneNumber)

        if(userByPhoneNumber){
            throw new ErrorClasses.CustomError({ m: 'User already exists with same phone number', w })
        }

        return this.authModel.createNewUser({ name, emailId, phoneNumber })
    }

    async generateOtpAndSendToUser({ sendOtpTo, typeOfOtp, userId }: { sendOtpTo: string, typeOfOtp: string, userId: ObjectId }){
        let w = 'AuthService.generateOtpAndSendToUser'

        // fetch the given user details
        let userDetails = await this.userService.fetchUserById(userId)

        // throw error if user is not present
        if(!userDetails){
            throw new ErrorClasses.CustomError({ m: 'User does not exists', w })
        }

        // check email ID is present for the given user if
        // incase dispatch method is through email
        if(sendOtpTo === SEND_OTP_TO.EMAIL && !userDetails.email_id){
            throw new ErrorClasses.CustomError({ m: 'Email ID is not present for the given user', w })
        }

        // check phone number is present for the given user if
        // incase dispatch method is through phone
        if(sendOtpTo === SEND_OTP_TO.PHONE && !userDetails.phone_number){
            throw new ErrorClasses.CustomError({ m: 'Phone number is not present for the given user', w })
        }

        // generate a new otp for the given user
        let newlyGeneratedOpt = await this.generateOtpForUser({ userId, sendOtpTo, typeOfOtp })

        // dispatch the newly generated otp through the given method (email / phone)
        this.dispatchOtp({ otp: newlyGeneratedOpt, sendOtpTo, typeOfOtp, userDetails })
        
        return { message: "OTP is sent to the user successfully" }
    }

    async generateOtpForUser({ userId,  sendOtpTo, typeOfOtp }: { userId: ObjectId, sendOtpTo: string, typeOfOtp: string }){
        let w = 'AuthService.generateOtpForUser'
        let newlyGeneratedOtp = await this.generateOTP()

        let otpObject = {
            otp: newlyGeneratedOtp,
            source: sendOtpTo,
            type: typeOfOtp
        }

        // insert the new otp object 
        let newlyInsertedOtp = await this.authModel.generateOtpForUser({ otpObject, userId })

        // check whether the insertion is successfully happened
        if(!newlyInsertedOtp.acknowledged){
            throw new ErrorClasses.CustomError({ m: 'Failed to generate OTP for the given user', w })
        }

        return newlyGeneratedOtp
    }

    // TODO dispatch logic needs to be implemented
    async dispatchOtp({ otp, typeOfOtp, sendOtpTo, userDetails }: { otp: string, sendOtpTo: string, typeOfOtp: string, userDetails: any }){
        console.log("OTP is dispatched", { otp, typeOfOtp, sendOtpTo, userDetails })
    }

    async verifyOtp({ otp, receivedOtpFrom, typeOfOtp, userId }: { otp: string, receivedOtpFrom: string, typeOfOtp: string, userId: ObjectId }){
        let w = 'AuthService.verifyOtp'
        let lastGeneratedOpt = await this.authModel.getLastGeneratedOtp({ userId, type: typeOfOtp, source: receivedOtpFrom })

        if(!lastGeneratedOpt){
            throw new ErrorClasses.CustomError({ m: 'OTP of given specification cannot be found for the user', w })
        }

        let otpExpirationTime = parseInt(config.auth_opt_expiration_time || '0')
        let currentTime = new Date().getTime()
        let otpCreatedAt = new Date(lastGeneratedOpt.created_at).getTime()

        // checking whether otp is matching
        // and at the same time otp is not expired
        if(!(lastGeneratedOpt.otp === otp && (currentTime - otpCreatedAt) <= otpExpirationTime)){
            throw new ErrorClasses.CustomError({ m: 'Invalid OTP', w })
        }

        // TODO
        // typeOfOtp
        // based on the type of otp, user level updates needed to be made

        return {}
    }

}

export = AuthService