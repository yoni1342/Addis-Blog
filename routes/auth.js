const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res)=>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedpass =  await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedpass,
            })
            const user = await newUser.save();
            res.status(200).json(user); 
        }catch(err){
            res.status(500).json(err);
        }
})

//Login


router.post('/login', async(req, res)=>{
    try{
        // const {username, password} = req.body
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).json("Wrong Credential!");
        const validate = await bcrypt.compare(req.body.password, user.password)
        if(!validate) return res.status(400).json("Wrong Credential!");
        
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router