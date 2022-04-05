const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use("/images", express.static(path.join(__dirname, '/images')))
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, 'images')
    }, filename: (req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage})
app.post('/api/upload', upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute)

//serve static assets if in production
// if(process.env.NODE_ENV === 'production'){
//     // set static folder
//     // app.use(express.static(''))
// }


const port =process.env.PORT || 5000 
app.listen(port, ()=>{console.log("Back end runnig")})