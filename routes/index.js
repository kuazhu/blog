/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-10 17:03:14
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js');
const router = Router();

//显示首页
router.get("/",(req,res)=>{
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		let options = {
			page: req.query.page,//需要显示的页码
			model:ArticleModel, //操作的数据模型
			query:{}, //查询条件
			projection:'-__v', //投影，
			sort:{_id:-1}, //排序
			populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
		}

		pagination(options)
		.then((data)=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				articles:data.docs,
				page:data.page,
				list:data.list,
				pages:data.pages,
				categories:categories,
				url:'/articles'
			});	
		})	
	})
})

//ajax请求获取文章列表的分页数据
router.get("/articles",(req,res)=>{
	let options = {
		page: req.query.page,//需要显示的页码
		model:ArticleModel, //操作的数据模型
		query:{}, //查询条件
		projection:'-__v', //投影，
		sort:{_id:-1}, //排序
		populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
	}

	pagination(options)
	.then((data)=>{
		res.json({
			code:'0',
			data:data
		})
	})
});

module.exports = router;