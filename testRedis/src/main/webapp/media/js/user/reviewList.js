
var user = function () {
	
	// 分页
	var handlePagination = function(pageNum) {
        var pIndex = GetQueryString("pIndex");
        if (pIndex == null){
        	pIndex = 1;
        }
        $('#pager').bootpag({
            total: pageNum,
            page: pIndex,
            maxVisible: 6 
        }).on('page', function(event, num){
        	var parameters = getQueryParameters(num);
            window.location.href='/user/reviewList?' + parameters;
        });
    }
    return {
        init: function (pageNum) {
        	// 分页
        	handlePagination(pageNum);
			
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
    var status = GetQueryString('status');//  用户状态
    var userType = GetQueryString('userType');//  用户类型
    var realName = GetQueryString('realName');//  公司名称
    
    if (pIndex == null || pIndex == "") {
    	pIndex = 1;
	}
    var paraStr = "pIndex=" + pIndex;
    if (mobile != null && mobile != ""){
        paraStr += "&mobile=" + mobile;
    }
    if(status != null && status != ""){
    	paraStr += "&status="+status;
    }
    if(userType != null && userType != ""){
    	paraStr += "&userType="+userType;
    }
    if(realName != null && realName != ""){
    	paraStr += "&realName="+realName;
    }
    return paraStr;
 }
