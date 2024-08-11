const express = require ('express')
const dotenv = require ('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

dotenv.config({path:'config.env'})
const ApiError = require('./utils/apiError')
const dbConnection= require('./config/database')
const categoryRoute = require('./routes/categoryRoute')
const subCategoryRoute = require('./routes/subCategoryRoute')
const globalError = require('./middlewares/errorMiddleware')

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
app.use('/api/v1/subcategories', subCategoryRoute)
app.use('*', (req,res,next)=>{
    next( new ApiError(`Cant find this route: ${req.originalUrl}`,400))
})

// Global error handling middleware for express
app.use(globalError)
  
const PORT = process.env.PORT 
 const server = app.listen(PORT,()=>{
    console.log(`App is Running on ${PORT}`)
})


// Handling rejections outside express
process.on('unhandledRejection', (err)=>{
    console.log(`unhandledRejection : ${err.name} | ${err.messaage}`)
    server.close(()=>{
        console.error('Shutting down...')
        process.exit(1)
    })
   
})