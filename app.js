import express from 'express'
import { errorHandlerMiddleware } from './middlewares/Error.js'
import { verifyToken } from './middlewares/Auth.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Routes import
import jobRoute from './routes/jobRoute.js'
import authRoute from './routes/authRoute.js'

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
app.use(errorHandlerMiddleware)

// Routes
app.get('/',(req,res) => {res.send('Jobs API portal')})
app.use('/jobs',verifyToken,jobRoute)
app.use('/auth',authRoute)

app.listen(port)