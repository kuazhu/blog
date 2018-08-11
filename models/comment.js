/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-11 17:23:35
*/
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  article:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Article'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },  
  content:{
    type:String,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }   
});


const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;