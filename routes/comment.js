/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-11 17:26:24
*/
const Router = require('express').Router;
const CommentModel = require('../models/comment.js')

const router = Router();

//添加评论
router.post("/add",(req,res)=>{
	let body = req.body;
	new CommentModel({
		article:body.id,
		user:req.userInfo._id,
		content:body.content
	})
	.save()
	.then(comment=>{
		res.json({
			code:0
		});
	})
})


module.exports = router;