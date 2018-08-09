/*
* @Author: TomChen
* @Date:   2018-08-07 15:05:21
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-07 17:25:10
*/
(function($){
	
	$('#btn-sub').on('click',function(){
		//验证
		var cateName = $('[name="name"]').val()
		if(cateName.trim() == ''){
		 $('.err').html('分类名称不能为空')	
		 return false;
		}
		$('.err').html('')
	});
	
})(jQuery);