		
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
        	var userId = $("#userId").val();
            window.location.href='/fund/rechargeList?' + parameters+"&userId="+userId;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
var realName = GetQueryString('realName');// 客户名称
    	
        var bankCode = GetQueryString('bankCode');// 充值银行
        
        var moneyType = GetQueryString('moneyType');// 币种
        
        var status = GetQueryString('status');// 状态
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (realName != null && realName != ""){
        	
            paraStr += "&realName=" + realName;
        
        }
        
        if (bankCode != null && bankCode != ""){
        	
            paraStr += "&bankCode=" + bankCode;
        
        }
        
        if (moneyType != null && moneyType != ""){
        	
        	paraStr += "&moneyType=" + moneyType;
        	
        }
        
        if (status != null && status != ""){
        	
        	paraStr += "&status=" + status;
        	
        }
        
        
        return paraStr;
		
	}
