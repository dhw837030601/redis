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
        	
            window.location.href='/order/allOrder?' + parameters;
            
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
        
        var queryOrderId = GetQueryString('queryOrderId');// id
        
        var queryFromCompany = GetQueryString('queryFromCompany');// 付款单位
        
        var queryToCompany = GetQueryString('queryToCompany');// 收款单位
        
        var queryOrderStatus = GetQueryString('queryOrderStatus');// 状态
        
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
        
        if (queryOrderId != null && queryOrderId != "0"){
        	
            paraStr += "&queryOrderId=" + queryOrderId;
        
        }
        
        if (queryFromCompany != null && queryFromCompany != ""){
        	
            paraStr += "&queryFromCompany=" + queryFromCompany;
        
        }
        
        if (queryToCompany != null && queryToCompany != ""){
        	
            paraStr += "&queryToCompany=" + queryToCompany;
        
        }
        
        if (queryOrderStatus != null && queryOrderStatus != "-1"){
        	
            paraStr += "&queryOrderStatus=" + queryOrderStatus;
        
        }
        
        return paraStr;
		
	}