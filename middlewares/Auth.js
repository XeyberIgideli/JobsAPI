import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from "../utils/Error.js"


function verifyToken(req,res,next) {
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError('Invalid authentication')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId,name:payload.name}
    } catch(err) {
        throw new UnauthenticatedError('Invalid authentication')
    }
}

export {verifyToken}