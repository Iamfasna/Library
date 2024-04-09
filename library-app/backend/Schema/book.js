const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  language: {
    type: String,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },

  issueStatus: [{
    status: {
      type: String,
      default: "No",
      required: true
    },

  }]



})

module.exports = mongoose.model("book", bookSchema);//name of collection