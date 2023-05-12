import express from 'express'
import { errorHandlerMiddleware } from './middlewares/Error.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 9000
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(errorHandlerMiddleware)

// Routes

app.listen(port)