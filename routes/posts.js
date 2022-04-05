const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Create 
router.post('/create', async(req, res)=>{
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(404).json('User Not Found');
    try{
        const newPost = await Post.create({
            title: req.body.title,
            desc: req.body.desc,
            photo: req.body.photo,
            username: req.body.username,
            categories: req.body.categories,
        });
        res.status(200).json(newPost)
    }catch(err){
        res.status(500).json(err)
    }
})


// Update 
router.put('/:id', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json("Post not found!")
        if(post.username != req.body.username) return res.status(401).json("you can update only your post")
        try{
            const updatePost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatePost); 
        }catch(err){
            res.status(500).json(err);
        }
    }catch(err){
        res.status(500).json(err)
    }
})


// Delete 
router.delete('/:id', async(req, res)=>{
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json("Post not found!")
    if(post.username != req.body.username) return res.status(401).json("you can update only your post");
    try{
       const deletePost = await Post.findByIdAndDelete(req.params.id);
       res.status(200).json("Post has been deleted....");
    }catch(err){
        res.status(500).json(err)
    }
})

//Get User

router.get('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json("Post not found!")
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})

// Get All Posts

router.get('/', async (req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        }
        else if(catName){
            posts = await Post.find({categories:{ $in:[catName] }})
        }
        else{
            posts = await Post.find();
        }

        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router