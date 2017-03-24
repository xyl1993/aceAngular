mainModule.directive("equelframe",[function(){
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	scope.getContentUrl = function(){
        		var src = $(element).parent().data('src');
        	    return src;
        	}
        },
        template:'<div ng-include="getContentUrl()"></div>'
    } 
}]).directive("tabContentDirective",[function(){
    /**
     * 根据url生成菜单
     */
	 return {  
	        restrict: 'AE',  
	        scope: true,
	        link:function(scope,element,attrs){
	        	
	        },
	        templateUrl: function(elem,attrs) {
	            return attrs.url
	        }
	    } 
}]).directive("topTagClose",[function(){
	/**
	 * 菜单右击关闭弹出窗
	 */
	return {
		restrict: 'AE',
		scope: true,
        templateUrl: 'src/tmp/baseTmp/topTagClose.html',
		link:function(scope,element,attrs){
            var flag = attrs.flag;
			if(flag=='home'){
				$('#closeThis').addClass('menu-disabled');
                $('#closeThis').click(function (event) {
                    return false;//阻止事件冒泡
                })
			}else{
				$('#closeThis').click(function (event) {
                    $('#'+flag).remove();
					$(this).closest('.top-menu-list').remove();
					var lastTab = $('#menu').children(".top-menu-list:last-child");
					var category = lastTab.data('category');
					if($('#menu').children(".top-menu-list.active").length==0){
						lastTab.addClass('active');
						$('#'+category).show();
					}
				})
			}
			$('#closeOther').click(function () {
				$('#'+flag).siblings('.not-main-tab').remove();
				$(this).closest('.top-menu-list').siblings('.not-main-tab').remove();
				$(this).closest('.top-menu-list').addClass('active');
				$('#'+flag).show();
			});
            $(":not(.top-tag-ul *)").click(function(){
                $('#closeTag').remove();
            });
		}
	}
}]).directive("mainDirective",[function(){
    /**
     * 首页指令
     */
	 return {  
	        restrict: 'AE',  
	        scope: true,
	        link:function(scope,element,attrs){
	        	
	        },
	        templateUrl:'src/tmp/main.html'
	    } 
}]).directive("topMenu",['$compile',function($compile){
    /**
     * tab目录切换指令&&右击关闭指令
     */
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	$(element).click(function(){
        	    var flag = $(element).data('category');
        	    $('#'+flag).show();
        	    $('#'+flag).siblings().hide();
        	})
            //鼠标右击事件
			$(element)[0].oncontextmenu = function(){
				$('#closeTag').remove();
				var _menu = '<top-tag-close id="closeTag" data-flag='+$(this).data('category')+'></top-tag-close>';
				$(this).append($compile(_menu)(scope));
				return false;
			}
        }
    } 
}]).directive("closeTopTab",[function(){
    /**
     * tab目录关闭指令
     */
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
            $(element).click(function(){
                var flag = $(this).data('category');
                $('#'+flag).remove();
                $(this).closest('li').remove();
                if($('#menu').children("li.active").length==0){
                    var lastTab = $('#menu').children("li:last-child");
                    lastTab.addClass('active');
                    var category = lastTab.data('category');
                    $('#'+category).show();
                }
            })
        }
    }
}]).directive("leftMenu",['$compile',function($compile){
    /**
     * 菜单点击事件
     */
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	$(element).click(function(){
				var maxWith = $('#menu').width(),
                    sumWidth = 0,
                    menuName = $(this).data('name'),
                    type = $(this).data('type'),
                    url = $(this).data('url'),
                    topListAry = $('.top-menu-list');
        	    $('.top-menu-list').removeClass('active');
    	    	$('.child-content').hide();
        	    if($('[data-category='+type+']').length!=0){
        	    	$('li[data-category='+type+']').addClass('active');
    	        	$('div[data-category='+type+']').show();
        	    }else{
					for(var i=0,len = topListAry.length;i<len;i++){
						sumWidth = sumWidth+$(topListAry[i]).width();
					}
					if(sumWidth+130>maxWith){
						bootbox.alert("不能在添加啦");
						return;
					}
        	        var _temp = '<li class="active top-menu-list not-main-tab" data-category = "'+type+'" top-menu >'+
				                  '<a data-toggle="tab">'+menuName+'<span class="icon-remove" data-category = "'+type+'" close-top-tab></span>'+'</a>'+
				                 '</li>';
                    var _childHtml = "<div data-category = '"+type+"' id='"+type+"' class='child-content not-main-tab'>"+
     	    							'<tab-content-directive url='+url+'></tab-content-directive>'+
     	                              '</div>';
                    var $_temp = $compile(_temp)(scope);
                    var $_childHtml = $compile(_childHtml)(scope);
                    $('#menu').append($_temp);
                    $('#content-dyn').append($_childHtml);
        	    }
                $('.left-tab-menu').removeClass('active');
                $(element).addClass('active');
        	})
        }
    } 
}]).directive("bootstrapTabClick",[function(){
    /**
     * bootstrap tab页切换指令
     */
	 return {  
	        restrict: 'AE',  
	        link:function(scope,element,attrs){
	        	$(element).click(function(){
	        	    var href = $(this).data('href');
	        	    $(href).show();
	        	    $(href).siblings().hide();
	        	})
	        }
	    } 
	}]);