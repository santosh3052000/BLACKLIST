const express = require('express')
const Router = express.Router()
const Driver = require('./model')

Router.post('/drivers', async(req,res)=>{
    try{
        const newDriver = await Driver.create({
            Rank:req.body.Rank,
            Name:req.body.Name,
            Car:req.body.Car
        })
        res.json(newDriver)
    }catch(err){
        res.json({Message:err.message})
    }
})

Router.put('/drivers/:id',async(req,res)=>{
    await Driver.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{
            Rank:req.body.Rank,
            Name:req.body.Name,
            Car:req.body.Car
        }}
    )
    res.send('Updated !')
})

Router.delete('/drivers/:id',async(req,res)=>{
    await Driver.findOneAndDelete({_id:req.params.id})
    res.send('Deleted !')
})

Router.get('/drivers',async(req,res)=>{
    const drivers = await Driver.find()
    res.json(drivers)
})

module.exports = Router