import express from 'express'
import { responseWrapper } from '../middlewares/general'

// importing controllers
import { userController } from '../controllers'

let router = express.Router()

router.get('/email', responseWrapper(userController.fetchUserByMailId))
router.get('/phone', responseWrapper(userController.fetchUserByPhoneNumber))

export = router