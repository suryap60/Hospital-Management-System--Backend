import { config } from 'dotenv'
import express, { json } from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import { router } from './router/router.js'


const app = express()
app.use(express.json())
app.use(cors())


config()
connectDB()

app.use('/api',router)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})