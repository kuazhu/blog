/*
* @Author: TomChen
* @Date:   2018-08-07 15:05:21
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-14 09:25:11
*/
(function($){
	$('.btn-remove').on('click',function(){
		$(this.parentNode).remove();
	}) 

	$('.btn-add').on('click',function(){
		var $this = $(this);
		var $dom = $this.siblings().eq(0).clone(true);
		$dom.find('[type="text"]').val('');
		$(this.parentNode).append($dom);
	}) 
	
})(jQuery);