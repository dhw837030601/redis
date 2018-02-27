var userArticle = function () {
	
	// 分页
	var handlePagination = function(pageNum) {
        
        var pIndex = $("#pageIndex").val();
       
        if (pIndex == null){
        	
        	pIndex = 1;
        
        }
            
        $('#pager').bootpag({
        	
            total: pageNum,
            
            page: pIndex,
            
            maxVisible: 6 
            
            
        }).on('page', function(event, num){
        	
        	var parameters = getQueryParameters(num);
        	var id = $("#userId").val();
            window.location.href='/user/userPublish?id=' +id  +"&type=3" + "&" + parameters;
            
        });

    }
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
			
			if (jQuery().datepicker) {
                $('.date-picker').datepicker();
            }

            App.initFancybox();
			
        }
    
    };

}();


  function GetQueryString (name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
 function getQueryParameters (pIndex){
		
		var mobile = GetQueryString('mobile');// 手机号
    	
        var nickName = GetQueryString('nickName');// 昵称
        
        var gendar = GetQueryString('gendar');// 性别
        
        var regTime = GetQueryString('regTime');// 注册时间
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (mobile != null && mobile != ""){
        	
            paraStr += "&mobile=" + mobile;
        
        }
        
        if (nickName != null && nickName != "-1"){
        	
            paraStr += "&nickName=" + nickName;
        
        }
        
        if (gendar != null && gendar != ""){
        	
            paraStr += "&gendar=" + gendar;
            
        }
        if (regTime != null && regTime != ""){
        	
        	paraStr += "&regTime=" + regTime;	
        	
        }
        
        return paraStr;
		
	}

 
	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}