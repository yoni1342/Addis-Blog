const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Catagory = require('../models/Category')

// Create Category  
router.post('/', async (req, res)=>{
    try{
        const newCat = await Catagory.create(req.body);
        res.status(200).json(newCat);
    }catch(err){
        res.status(500).json(err)
    }
})

// Get All Categories  
router.get('/', async (req, res)=>{
    try{
        const cats = await Catagory.find({});
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
