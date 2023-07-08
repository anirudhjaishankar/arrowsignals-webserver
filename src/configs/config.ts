import dotenv from 'dotenv'

// get the current environment and its env path
let currentEnvironment = process.env.NODE_ENV
let configFilePath = `./env/${currentEnvironment}.env`

// load commonly used env variables across the environments
dotenv.config()

// load the current env variables into process.env
dotenv.config({ path: configFilePath })

// to export all the current env variables
let loadConfigurations = () => {
    return {
        port: process.env.PORT,
        mongodb_url: process.env.MONGO_DB_URL,
        mongodb_name: process.env.MONGO_DB_NAME,
        auth_opt_expiration_time: process.env.AUTH_OTP_EXPIRATION_TIME
    }
}

export = loadConfigurations()