		
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
        	
            window.location.href='/audit/myAuditList?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var auditType = GetQueryString('auditType');//审核类型
    	
        var payOrderId = GetQueryString('payOrderId');// 订单Id
        
        var status = GetQueryString('status');// 状态
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (auditType != null && auditType != ""){
        	
            paraStr += "&auditType=" + auditType;
        
        }
        
        if (payOrderId != null && payOrderId != ""){
        	
            paraStr += "&payOrderId=" + payOrderId;
        
        }
        
        if (status != null && status != ""){
        	
        	paraStr += "&status=" + status;
        	
        }
        
        return paraStr;
		
	}
