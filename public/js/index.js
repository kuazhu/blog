/*
* @Author: Tom
* @Date:   2018-07-17 10:55:01
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-07 15:06:10
*/
(function($){
	var $login = $('#login');
	var $register = $('#register');
	var $userInfo = $('#user-info');

	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	});

	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	});
	//验证的正则
	var usernameReg = /^[a-z][a-z|0-9|_]{2,9}$/i;
	var passwordReg = /^\w{3,10}$/;

	//用户注册处理
	$('#sub-register').on('click',function(){
		//获取数据
		var username = $register.find("[name='username']").val();
		var password = $register.find("[name='password']").val();
		var repassword = $register.find("[name='repassword']").val();

		var errMsg = '';
		//验证
		//用户名:以字母开头包含数字字母和下划线,3-10个字符
		if(!usernameReg.test(username)){
			errMsg = '用户名以字母开头包含数字字母和下划线,3-10个字符'
		}
		//密码:3-10个字符
		else if(!passwordReg.test(password)){
			errMsg = '密码为3-10个字符'
		}
		else if(password != repassword){
			errMsg = '两次密码不一致'
		}

		if(errMsg){//验证不通过
			//显示错误信息
			$register.find('.err').html(errMsg);
			return;
		}else{
			$register.find('.err').html('');
			//发送数据到后端(ajax)
			$.ajax({
				url:"/user/register",
				data:{
					username:username,
					password:password
				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				if(result.code === 0){//注册成功
					$('#go-login').trigger('click')
				}else{
					$register.find('.err').html(result.message)
				}
			})
			.fail(function(err){
				console.log(err)
			})
		}	
	})

	//用户登录
	$('#sub-login').on('click',function(){
		//获取数据
		var username = $login.find("[name='username']").val();
		var password = $login.find("[name='password']").val();

		var errMsg = '';
		var $err = $login.find('.err');
		//验证
		//用户名:以字母开头包含数字字母和下划线,3-10个字符
		if(!usernameReg.test(username)){
			errMsg = '用户名以字母开头包含数字字母和下划线,3-10个字符'
		}
		//密码:3-10个字符
		else if(!passwordReg.test(password)){
			errMsg = '密码为3-10个字符'
		}

		if(errMsg){//验证不通过
			//显示错误信息
			$err.html(errMsg)
			return;
		}else{
			$err.html('')
			//发送数据到后端(ajax)
			$.ajax({
				url:"/user/login",
				data:{
					username:username,
					password:password
				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				console.log(result);
				if(result.code === 0){//登录成功
					/*
					$login.hide();
					$userInfo.find('span').html(result.data.username)
					$userInfo.show(); 
					*/
					//刷新当前页面(首页)
					window.location.reload();
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				console.log(err)
			})
		}			
	})
	//用户退出
	$('#logout').on('click',function(){
		$.ajax({
			url:"/user/logout",
			dataType:'json',
			type:'get'
		})
		.done(function(result){
			if(result.code == 0){
				window.location.reload();
			}
		})
		.fail(function(err){
			console.log(err)
		})		
	});
})(jQuery);