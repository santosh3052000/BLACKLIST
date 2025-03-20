const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    Rank:Number,
    Name:String,
    Car:String
})

const drivermodel = mongoose.model('Driver',driverSchema)

module.exports = drivermodel