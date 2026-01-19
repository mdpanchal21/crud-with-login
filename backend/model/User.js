const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
    },
    photo : {
        type : String , 
        required : true,
    },
},
{timestamps : true});

module.exports = mongoose.model("user" , user)