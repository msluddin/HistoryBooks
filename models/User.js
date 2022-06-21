const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: false
    },
    githubId:{
        type: String,
        required: false
    },
    // displayName:{
    //     type: String,
    //     required: true
    // },
    // firstName:{
    //     type: String,
    //     required: true
    // },
    // lastName:{
    //     type: String,
    //     required: true
    // },
    username:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)