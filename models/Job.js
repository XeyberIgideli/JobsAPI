import mongoose from 'mongoose'
import User from './User.js'

const jobSchema = new mongoose.Schema({
    company: {
        type:String,
        required:true,
        trim:true
    },
    position:{
        type: String,
        required:true,
        maxlength:100
    },
    status: {
        type: String,
        enum:['interview','declined','pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Job = mongoose.model('Jobs',jobSchema)

export default Job