const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt')
//Update
router.put('/:id', async (req, res)=>{
        if(req.body.userId != req.params.id) return res.status(401).json("you can update only your account");   
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } 
        try{
            const old = await User.findById(req.params.id);            
            const updatedUser = await User.findByIdAndUpdate({_id: req.params.id}, {
                $set: req.body,
            }, {new:true})
            if(req.body.username){
                try{
                    const posts = await Post.find({username: old.username})
                    posts.forEach(async (p)=>{
                        p.username = updatedUser.username;
                        try{
                            await Post.findByIdAndUpdate({_id: p.id}, {
                                $set: p
                            })
                        }catch(err){
                            // res.status(500).json(err)
                        }
                    })
                    // res.status(200).json(posts)
                }catch(err){
                    res.status(500).json(err)
                }

            } 
            res.status(200).json(updatedUser);
            
        }catch(err){
            res.status(500).json(err);
        }
})


//Delete
router.delete('/:id', async(req, res)=>{
    if(req.body.userId != req.params.id) return  res.status(401).json("you can delete only your account");   
    try{
        const user = await User.findById(req.params.id);
        try{
            const deletePost = await Post.deleteMany({username: user.username});
            const deleteUser = await User.findByIdAndDelete({_id: req.params.id},{new:true})
            res.status(200).json("User hase been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }catch(err){
        res.status(404).json("User not found")
    }
})

//Get User
router.get('/:id', async (req, res)=>{
    try{
        const user = await User.findById({_id: req.params.id});
        if(!user) return res.status(404).json("User Not Found!");
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router


// await Post.findByIdAndUpdate({_id: p.id}, {
//     $set: p
// })