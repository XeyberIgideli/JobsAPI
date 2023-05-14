import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { BadRequestError,UnauthenticatedError } from "../utils/Error.js"

async function register (req,res) {
    try {        
        const user = await User.create(req.body)
        
        const token = user.createJWT()
 
        res.status(200).json(token)

    } catch (err) {       
         res.status(400).json(err)
    }
}
async function login(req,res) {
    const {email,password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please fill in inputs!')
    }

    const user = await User.findOne({email})
    const isPassCorrect = await user.isPasswordCorrect(password)
    if(!user) {
        throw new UnauthenticatedError()
    }
    if(!isPassCorrect) {
        throw new BadRequestError()
    }

    const token = user.createJWT()

    res.status(200).json({name:user.name,token})

}

export {login,register}