import * as ErrorClasses from '../helpers/error-classes'
import { VALIDATION_REGEX } from './constants'
import { ObjectId } from 'mongodb'

class BaseValidator {
    constructor(){

    }

    isValidMongoObjectId(id: string | ObjectId, throwError = true){
        let w = 'BaseValidator.isValidMongoObjectId'
        let objectId = id + '' // converting into string incase of any mismatch

        if(!ObjectId.isValid(objectId)){
            if(!throwError){
                return false
            }
            throw new ErrorClasses.InvalidObjectId({ m: `Invalid Mongo ObjectId: ${id}`, w })
        }

        return true
    }

    isValidPhoneNumber(phoneNumber: string | number){
        let w = 'BaseValidator.isValidPhoneNumber'

        if(!VALIDATION_REGEX.PHONE_NUMBER.test(String(phoneNumber))){
            throw new ErrorClasses.InvalidUserInput({ m: 'Invalid user input: phone number', w })
        }
    }

    isValidEmailAddress(emailId: string){
        let w = 'BaseValidator.isValidEmailAddress'

        if(!VALIDATION_REGEX.EMAIL_ID.test(emailId)){
            throw new ErrorClasses.InvalidUserInput({ m: 'Invalid user input: email address', w })
        }
    }
}

export = BaseValidator