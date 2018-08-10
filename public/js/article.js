/*
* @Author: TomChen
* @Date:   2018-08-07 15:05:21
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-10 09:19:17
*/
(function($){
	
    ClassicEditor
        .create( document.querySelector( '#editor' ),{
        	language:'zh-cn',
        	ckfinder: {
        		uploadUrl : '/admin/uploadImages'
   			}
        } )
        .catch( error => {
            console.error( error );
        } );
	
})(jQuery);