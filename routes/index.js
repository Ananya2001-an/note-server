const express = require('express')
const router = express.Router()
const Assign = require('../models/assignments')

router.get('/', async(req, res)=>{
    let assignments
    try{
        assignments = await Assign.find().sort({deadline: 1}).exec()
    }catch{
        assignments = []
    }

    res.json(assignments)
})

module.exports = router