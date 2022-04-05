const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "The User Must Have a Name"],
        unique : true,
    },
    email:{
        type: String,
        require: [true],
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
        default: "",
    }
    
},{timestamps:true})


module.exports = mongoose.model("User", userSchema);