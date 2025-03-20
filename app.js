const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const Router = require('./route')
const morgan = require('morgan')
require('dotenv').config()

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_STR)
        console.log('DB Connected !')
    }catch(err){
        console.log('DB Connection Issue !!!')
        process.exit(1)
    }
}
connectDB()
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET","PUT","DELETE"], 
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/',Router)

app.listen(1000,()=>{console.log(`Server is running at http://localhost:1000`)})