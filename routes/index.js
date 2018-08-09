/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-09 16:02:41
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const router = Router();

//显示首页
router.get("/",(req,res)=>{
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories:categories
		});		
	})
})

module.exports = router;