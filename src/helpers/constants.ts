export const MONGO_COLLECTIONS = {
    USER: 'user',
    AUTH_OTP: 'auth_otp'
}

export const VALIDATION_REGEX = {
    EMAIL_ID: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PHONE_NUMBER: /^[1-9][0-9]{9}$/
}

export const USER_ACTIONS = {
    REGISTERED: 'REGISTERED'
}

export const OTP_TYPE = {
    AUTHENTICATION: 'authentication',
    REGISTRATION: 'registration'
}

export const OPT_TYPES = [
    OTP_TYPE.AUTHENTICATION, OTP_TYPE.REGISTRATION
]

export const SEND_OTP_TO = {
    EMAIL: 'email',
    PHONE: 'phone'
}