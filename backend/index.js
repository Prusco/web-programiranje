import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/booking.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin: true,
    credentials: true
}

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB database connected');
    }catch (err){
        console.log('MongoDB database connection failed!');
    }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/tours', tourRoute)
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/review', reviewRoute)
app.use('/booking', bookingRoute)

app.listen(port, () => {
    connect();
    console.log('Server je pokrenut na portu ', port);
})