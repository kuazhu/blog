/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2018-08-06 17:09:18
*/
const Router = require('express').Router;

const router = Router();

//显示首页
router.get("/",(req,res)=>{

	res.render('main/index',{
		userInfo:req.userInfo
	});
})

module.exports = router;