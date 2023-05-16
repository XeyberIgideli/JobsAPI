import express from 'express'
import { verifyToken } from './middlewares/Auth.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Routes import
import jobRoute from './routes/jobRoute.js'
import authRoute from './routes/authRoute.js'
import { errorHandlerMiddleware } from './middlewares/Error.js'

const port = process.env.PORT || 9000
const app = express()

dotenv.config()

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.get('/',(req,res) => {res.send('Jobs API portal')})
app.use('/jobs',verifyToken,jobRoute)
app.use('/auth',authRoute)

app.use(errorHandlerMiddleware)
app.listen(port)