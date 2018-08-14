/*
* @Author: Tom
* @Date:   2018-07-17 10:55:01
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-14 14:43:59
*/
(function($){

	$('#btn-sub').on('click',function(){
		var passwordReg = /^\w{3,10}$/;
		//获取数据
		var password = $("[name='password']").val();
		var repassword = $("[name='repassword']").val();

		var $errs = $('.err');

		//密码:3-10个字符
		if(!passwordReg.test(password)){
			$errs.eq(0).html('密码为3-10个字符')
			return false;
		}else{
			$errs.eq(0).html('')
		}

		if(password != repassword){
			$errs.eq(1).html('两次密码不一致')
			return false;
		}else{
			$errs.eq(1).html('')
		}	
	})


})(jQuery);