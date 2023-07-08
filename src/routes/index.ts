import express from 'express'

// import all the routers
import authRouter from './auth.router'
import userRouter from './user.route'

let router = express.Router()

// setting up routers for the endpoints
router.use('/auth', authRouter)
router.use('/user', userRouter)


export = router