/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-09 16:53:19
*/
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  category:{
  	type:mongoose.Schema.Types.ObjectId,
  	ref:'Category'
  },
  user:{
  	type:mongoose.Schema.Types.ObjectId,
  	ref:'User'
  },  
  title:{
  	type:String,
  },
  intro:{
  	type:String,
  },
  content:{
  	type:String,
  }, 
  click:{
  	type:Number,
  	default:0
  },
  createdAt:{
  	type:Date,
  	default:Date.now
  }  
});


const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;