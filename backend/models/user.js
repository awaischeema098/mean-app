const mongoose  = require('mongoose');
 const uniqeValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    active: { type: Boolean, default: false},
    tempraryToken: {type: String, }
});

module.exports = mongoose.model('User', userSchema);