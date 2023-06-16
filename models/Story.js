const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    // connecting user to unique ObjectId to make sure its always protected for separate accounts
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // adding this field should be required because the app will break if the user is not present
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

// if collection doesnt exist in MongoDB, a collection will be created called 'User', it will pluralize 
module.exports = mongoose.model('Story', StorySchema)