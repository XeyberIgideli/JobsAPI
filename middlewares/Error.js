import { CustomAPIError } from "../utils/Error.js"

function errorHandlerMiddleware (err,req,res,next) {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    
    return res
    .status(500)
    .send('Something went wrong try again later')
}

export {errorHandlerMiddleware}