import express from 'express'
import { verifyToken } from './middlewares/Auth.js'
import { errorHandlerMiddleware } from './middlewares/Error.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Security packages
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
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

app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(xss())
app.use(cors())

// Routes
app.get('/',(req,res) => {res.send('Jobs API portal')})
app.use('/jobs',verifyToken,jobRoute)
app.use('/auth',authRoute)

app.use(errorHandlerMiddleware)
app.listen(port)