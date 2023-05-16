import User from "../models/User.js"
// import { errorHandlerMiddleware } from "../middlewares/Error.js"
import bcrypt from 'bcryptjs'
import { BadRequestError,UnauthenticatedError } from "../utils/Error.js"

async function register (req,res,next) {
    try {        
        const user = await User.create(req.body)
        
        const token = user.createJWT()
 
        res.status(200).json(token) 
    } catch (err) {     
        /*
        Without the next() The errors will not be handled by your error Handler middleware. It will be handled
        by Express framework’s default error handlerErrors that are created by asynchronous functions that are
        called from route handlers, need to be handled differently. The error from asynchronous functions are
        not handled by the default error handler in Express which can result in crashing the entire App.Putting
        then in a try catch block will help you handle those errors separately using you custom error handler
        */   
        next(err)// -> errorHandlingMiddleware
    }
}

async function login(req,res,next) {
    try {
        const {email,password} = req.body

        if(!email || !password) {
            throw new BadRequestError('Please fill in inputs!')
        }
    
        const user = await User.findOne({email})
        
        if(!user) {
            throw new UnauthenticatedError('There is not user like this!')
        }
        const isPassCorrect = await user.isPasswordCorrect(password)

        if(!isPassCorrect) {
            throw new BadRequestError('Password is not correct!')
        }
    
        const token = user.createJWT()
    
        res.status(200).json({name:user.name,token})
    } catch(err) {
        next(err)
    }

}

export {login,register}