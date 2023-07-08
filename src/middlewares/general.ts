import { Request, Response, NextFunction } from 'express'
import { CustomError, InvalidObjectId, InvalidUserInput } from '../helpers/error-classes'

let responseWrapper = (callback: Function) => {
    return async (request: Request, response: Response) => {
        try{
            let result = await callback(request)

            let { message = undefined, data = undefined } = result

            let clientResponse: any = { success: true }

            if(message) clientResponse.message = message
            if(data) clientResponse.data = data
            
            response.send(clientResponse)
        }
        catch(error){
            console.log("error happened >>> ", error)
            
            let clientErrorResponse: any = { success: false }

            if(
                error instanceof CustomError ||
                error instanceof InvalidUserInput ||
                error instanceof InvalidObjectId
            ){
                if(error.message) clientErrorResponse.message = error.message
                
                response.status(error.status)
                response.send(clientErrorResponse)
                return
            }
            
            clientErrorResponse.message = 'Unknown exception: Please try again later'
            response.status(500)
            response.send(clientErrorResponse)
        }
    }
}

let requestMiddleware = (request: Request, response: Response, next: NextFunction) => {
    next()
}

let responseMiddleware = (request: Request, response: Response, next: NextFunction) => {
    next()
}


export {
    requestMiddleware, 
    responseMiddleware,
    responseWrapper
}