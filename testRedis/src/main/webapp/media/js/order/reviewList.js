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
        	
            window.location.href='/order/reviewList?' + parameters;
            
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
        
        var paraStr = "pIndex=" + pIndex;
        
        if (queryDirectoryName != null && queryDirectoryName != ""){
        	
            paraStr += "&queryDirectoryName=" + queryDirectoryName;
        
        }
        
        if (queryDarentNavigator != null && queryDarentNavigator != "-1"){
        	
            paraStr += "&queryDarentNavigator=" + queryDarentNavigator;
        
        }
        
        return paraStr;
		
	}
	function changePayAtomStatus(atomId,pIndex){
		if(confirm("请再次确认已经付款！")){
			$.ajax({
				
				type : 'POST',
				
				url : '/loan/changePayAtomStatus',
				
				data : {'atomId':atomId},
				
				dataType : 'JSON',
				
				async : false, 
				
				success: function(data) {
					
					var ecode = data.ecode;
					
					var emsg = data.emsg;
					
					if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
						
						alert(emsg);
						// 刷新页面
						window.location.href='/order/reviewList?pIndex='+pIndex;
						
					} else {
						// 刷新页面
						window.location.href='/order/reviewList?pIndex=' + pIndex;

					}
					
				}
			});
		}
		
	}