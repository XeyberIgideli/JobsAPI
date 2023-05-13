import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your name!"],
        trim: true
    },
    email: {
        type:String,
        required: [true,"Please provide your E-mail addres!"],
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: [true,"Please provide a password!"],
        trim: true
    }
})

const User = mongoose.model('User',userSchema)

export default User