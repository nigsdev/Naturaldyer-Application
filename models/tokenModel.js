const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    token: { 
        type: String,
        required: true 
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 600 }
    }
});


tokenSchema.pre(/^find/, function(next) {
    this.populate('userId')
    next();
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;