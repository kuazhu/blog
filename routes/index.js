/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-11 11:39:38
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js');
const getCommonData = require('../util/getCommonData.js');
const router = Router();

//显示首页
router.get("/",(req,res)=>{
	/*
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{//获取分类
		ArticleModel.getPaginationArticles(req)
		.then((data)=>{//获取首页的文章列表
			ArticleModel.find({},'_id title click')
			.sort({click:-1})
			.limit(10)
			.then((topArticles)=>{
				res.render('main/index',{
					userInfo:req.userInfo,
					articles:data.docs,
					page:data.page,
					list:data.list,
					pages:data.pages,
					categories:categories,
					topArticles:topArticles,
					url:'/articles'
				});	
			});
		})	
	})
	*/
	ArticleModel.getPaginationArticles(req)
	.then(pageData=>{
		getCommonData()
		.then(data=>{
			res.render('main/index',{
				userInfo:req.userInfo,
				articles:pageData.docs,
				page:pageData.page,
				list:pageData.list,
				pages:pageData.pages,
				categories:data.categories,
				topArticles:data.topArticles,
				url:'/articles'
			});				
		})
	})
})

//ajax请求获取文章列表的分页数据
router.get("/articles",(req,res)=>{
	/*
	let options = {
		page: req.query.page,//需要显示的页码
		model:ArticleModel, //操作的数据模型
		query:{}, //查询条件
		projection:'-__v', //投影，
		sort:{_id:-1}, //排序
		populate:[{path:'category',select:'name'},{path:'user',select:'username'}]
	}

	pagination(options)
	*/
	ArticleModel.getPaginationArticles(req)
	.then((data)=>{
		res.json({
			code:'0',
			data:data
		})
	})
});

//显示详情页面

router.get("/view/:id",(req,res)=>{
	let id = req.params.id;
	/*
	ArticleModel.update({_id:id},{$inc:{click:1}})
	.then((raw)=>{
		ArticleModel.findById(id)
		.then((article)=>{
			console.log(article)
		})
	})
	*/
	/*
	ArticleModel.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
	.populate('category','name')
	.then((article)=>{
		CategoryModel.find({},'_id name')
		.sort({order:1})
		.then((categories)=>{//获取分类
			ArticleModel.find({},'_id title click')
			.sort({click:-1})
			.limit(10)
			.then((topArticles)=>{
				res.render('main/detail',{
					userInfo:req.userInfo,
					article:article,
					categories:categories,
					topArticles:topArticles
				})
			})
		})
	})
	*/
	ArticleModel.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
	.populate('category','name')
	.then(article=>{
		getCommonData()
		.then(data=>{
			res.render('main/detail',{
				userInfo:req.userInfo,
				article:article,
				categories:data.categories,
				topArticles:data.topArticles
			})			
		})
	})
})

module.exports = router;