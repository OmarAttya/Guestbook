const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  name: String,
  token: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate (value)  {
      if(!validator.isEmail(value)){
        throw new Error('Email is Invalid');
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  messages: [{
    content: String,
    reply: [{
      user: String,
      content: String
    }]
  }]
})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('users', userSchema)
