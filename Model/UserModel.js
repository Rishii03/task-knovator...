const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String,
         required:[true,'Please provide an Username!']},
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false,
  },
});
const userModel = mongoose.model('User', UserSchema)
module.exports = userModel;