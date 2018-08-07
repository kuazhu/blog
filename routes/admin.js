/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-07 16:29:23
*/
const Router = require('express').Router;

const UserModel = require('../models/user.js');

const router = Router();

//权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>');
	}
})

//显示管理员首页
router.get("/",(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	});
})

//显示用户列表
router.get('/users',(req,res)=>{
	//获取所有用户的信息,分配给模板
	
	//需要显示的页码
	let page = req.query.page || 1;

	if(page <= 0){
		page = 1;
	}

	//每页显示条数
	let limit = 2;

	/*
	分页:
	假设: 每页显示 2 条  
	limit(2)
	skip()//跳过多少条

	第 1 页 跳过 0 条
	第 2 页 跳过 2 条
	第 3 也 跳过 4 条

	综上发现规律:
	(page - 1) * limit
	*/

	UserModel.estimatedDocumentCount({})
	.then((count)=>{
		let pages = Math.ceil(count / limit);
		if(page > pages){
			page = pages;
		}
		let list = [];

		for(let i = 1;i<=pages;i++){
			list.push(i);
		}
		
		let skip = (page - 1)*limit;

		UserModel.find({},'_id username isAdmin')
		.skip(skip)
		.limit(limit)
		.then((users)=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page*1,
				list:list
			});			
		})

	})



})



module.exports = router;