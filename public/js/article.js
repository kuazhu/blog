/*
* @Author: TomChen
* @Date:   2018-08-07 15:05:21
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-09 17:33:07
*/
(function($){
	
    ClassicEditor
        .create( document.querySelector( '#editor' ),{
        	language:'zh-cn'
        } )
        .catch( error => {
            console.error( error );
        } );
	
})(jQuery);