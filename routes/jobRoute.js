import express from 'express'
import {getAllJobs,getJob,createJob,updateJob,deleteJob} from '../controllers/jobController.js'

const router = express.Router()

router.get('/',getAllJobs)
router.get('/:id',getJob)
router.post('/',createJob)
router.patch('/:id',updateJob)
router.delete('/:id',deleteJob)

export default router