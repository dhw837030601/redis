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
        	 var userId=$('#userId').val();
            window.location.href='/user/userOrder?' + parameters+"&userId="+userId;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var queryDirectoryName = GetQueryString('queryDirectoryName');// 菜单名称
    	
        var queryDarentNavigator = GetQueryString('queryDarentNavigator');// 所属父级
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex="+pIndex;
        if (queryDirectoryName != null && queryDirectoryName != ""){
        	
            paraStr += "&queryDirectoryName=" + queryDirectoryName;
        
        }
        
        if (queryDarentNavigator != null && queryDarentNavigator != "-1"){
        	
            paraStr += "&queryDarentNavigator=" + queryDarentNavigator;
        
        }
        
        return paraStr;
		
	}