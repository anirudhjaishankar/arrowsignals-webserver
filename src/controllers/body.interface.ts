// this file holds the type of data that different request body might holds
import { ObjectId } from "mongodb"

interface RegisterUserBody {
    name: string,
    email_id: string,
    phone_number: string
}

interface SendOtpBody {
    to: string,
    type: string,
    user_id: ObjectId
}

interface VerifyOtpBody {
    from: string,
    type: string,
    user_id: ObjectId,
    otp: string
}

export {
    RegisterUserBody, SendOtpBody, VerifyOtpBody
}