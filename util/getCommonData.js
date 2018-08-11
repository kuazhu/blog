/*
* @Author: TomChen
* @Date:   2018-08-09 10:22:53
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-11 11:41:17
*/
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
/*
获取前台共通数据
*/
let getCommonData = ()=>{

	return new Promise((resolve,reject)=>{
		CategoryModel.find({},'_id name')
		.sort({order:1})
		.then(categories=>{
			ArticleModel.find({},'_id title click')
			.sort({click:-1})
			.limit(10)
			.then(topArticles=>{
				resolve({
					categories:categories,
					topArticles:topArticles
				})
			})
		})
	});
}

module.exports = getCommonData;