const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  adminName: {
    type:String,
    required:true
  },

  email: {
    type:String,
    required:true,
    unique:true
  },

  password: {
    type:String,
    required:true
  },
  loggedIn: {
    type:Boolean,
    default:false
  }
  
 
})

module.exports = mongoose.model("admin",adminSchema);//name of collection