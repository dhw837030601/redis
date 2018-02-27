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
            
            window.location.href="/user/userLoan?"+parameters+"&userId="+userId;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var loanType = GetQueryString('loanType');// 贷款类型
    	
        var bankUserId = GetQueryString('bankUserId');// 贷款机构
        
        var status = GetQueryString('status');// 状态
        
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex="+pIndex;
        
        if (status != null && queryDirectoryName != ""){
        	
            paraStr += "&status=" + status;
        
        }
        
        if (bankUserId != null && bankUserId != ""){
        	
            paraStr += "&bankUserId=" + bankUserId;
        
        }
        
        if (loanType != null && loanType != ""){
        	
        	paraStr += "&loanType=" + loanType;
        	
        }
        
        return paraStr;
		
	}