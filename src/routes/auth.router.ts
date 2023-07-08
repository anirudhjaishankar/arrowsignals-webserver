import express from 'express'
import { responseWrapper } from '../middlewares/general'

// importing controllers
import { authController } from '../controllers'

let router = express.Router()

router.post('/register-user', responseWrapper(authController.registerUser))
router.post('/send-otp', responseWrapper(authController.sendOtp))
router.post('/verify-otp', responseWrapper(authController.verifyOtp))

export = router