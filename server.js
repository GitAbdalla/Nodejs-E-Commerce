const express = require ('express')
const dotenv = require ('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

dotenv.config({path:'config.env'})
const dbConnection= require('./config/database')
const categoryRoute = require('./routes/categoryRoute')

// connect with db
dbConnection()

//express app
const app = express()

//Middlewares
app.use(express.json())



if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log(`mode: ${ process.env.NODE_ENV}`)
}




// Routes
app.use('/api/v1/categories', categoryRoute)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`App is Running on ${PORT}`)
})