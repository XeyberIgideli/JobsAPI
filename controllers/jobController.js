import Job from "../models/Job.js"
import { BadRequestError,NotFoundError } from "../utils/Error.js"

async function getAllJobs (req,res) {
    try {  
        const job = await Job.find({createdBy:req.user.userId})
        res.status(200).json(job)
    } catch(err) {
        throw new BadRequestError('Something went wrong!:(')
    }
}
async function getJob (req,res) {
    const job = await Job.findOne({_id:req.params.id}) 
    res.status(201).json(job)
}
async function createJob (req,res) {
    try {
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(200).json(job)
    } catch(err) {
        throw new BadRequestError('Something went wrong!:(')
    }
}
async function updateJob (req,res) {
    const {
        body: {company,position},
        user:{userId},
        params:{id:jobId}
    } = req
    const job = await Job.findByIdAndUpdate({_id:jobId},req.body,{new:true})

    if(!job) {
        throw new NotFoundError('There is not job like this!')
    }
    
    res.status(201).json(job)
}
async function deleteJob (req,res) {
    const job = await Job.findByIdAndRemove({_id:req.params.id})

    if(!job) {
        throw new NotFoundError('There is not job like this!')
    }

    res.status(201).send('Job deleted!')
}

export {getAllJobs,getJob,createJob,updateJob,deleteJob}
