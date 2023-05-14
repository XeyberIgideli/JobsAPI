import Job from "../models/Job.js"
import { BadRequestError,UnauthenticatedError } from "../utils/Error.js"

async function getAllJobs (req,res) {
    try { 
        const job = await Job.find()
        res.status(200).json(job)
    } catch(err) {
        throw new BadRequestError('Something went wrong!:(')
    }
}
function getJob (req,res) {

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
function updateJob (req,res) {

}
function deleteJob (req,res) {

}

export {getAllJobs,getJob,createJob,updateJob,deleteJob}
