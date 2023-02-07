const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    fname : {type: String,required: true,trim:true},

    lname: {type: String,required: true, trim: true},

    phone: {type: String,required: true,unique: true,trim: true,
        match: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
    },
    password: {type: String,required: true,trim: true},
    
},{timestamps: true});

module.exports = mongoose.model('user', userSchema)