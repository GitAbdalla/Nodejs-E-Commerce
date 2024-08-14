const fs = require ('fs')
const dotenv = require('dotenv')
const Product = require('../../models/productModel')
const dbConnection = require('../../config/database')

dotenv.config({path: '../../config.env'})