/*
* @Author: Tom
* @Date:   2018-08-06 09:14:54
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-14 15:32:33
*/
//项目入口文件
const express = require('express');
const swig = require('swig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//启动数据库
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});

db.once('open',()=>{
	console.log('DB connected....');
});


const app = express();

//配置模板
swig.setDefaults({
  cache: false
});
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

//配置静态资源
app.use(express.static('public'));

//设置cookie的中间件,后面所有的中间件都会有cookie
/*
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	// console.log(req.cookies.get('userInfo'))
	req.userInfo = {};

	let userInfo = req.cookies.get('userInfo');

	if(userInfo){
		try{
			req.userInfo = JSON.parse(userInfo)
		}catch(e){
		}
	}

	next();
});
*/
app.use(session({
    //设置cookie名称
    name:'blid',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))

app.use((req,res,next)=>{

	req.userInfo  = req.session.userInfo || {};

	next();	
});

//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//处理路由
app.use("/",require('./routes/index.js'));
app.use("/user",require('./routes/user.js'));
app.use("/admin",require('./routes/admin.js'));
app.use("/category",require('./routes/category.js'));
app.use("/article",require('./routes/article.js'));
app.use("/comment",require('./routes/comment.js'));
app.use("/resource",require('./routes/resource.js'));
app.use("/home",require('./routes/home.js'));


app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
});