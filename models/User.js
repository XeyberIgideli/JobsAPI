import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your name!"],
        trim: true
    },
    email: {
        type:String,
        required: [true,"Please provide your E-mail address!"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address!',
        ],
        unique:true
    },
    password: {
        type: String,
        required: [true,"Please provide a password!"],
        minlength: 6
    }
})

userSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password,10,(err,hash) => {
        user.password = hash 
        next()
    })
})
// Creating JWT Token
userSchema.methods.createJWT = function() {
    return jwt.sign({userId:this.id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
};

// Compare hashed passwords
userSchema.methods.isPasswordCorrect = async function(password) {
    const isEqual = await bcrypt.compare(password,this.password)
    return isEqual
}

const User = mongoose.model('User',userSchema)


export default User