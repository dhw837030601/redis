		
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
        	
            window.location.href='/ship/allShipCompany?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var shipCompanyName = GetQueryString('shipCompanyName');// 中文名称
    	
        var shipCompanyEn = GetQueryString('shipCompanyEn');// 英文名称
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (shipCompanyName != null && shipCompanyName != ""){
        	
            paraStr += "&shipCompanyName=" + shipCompanyName;
        
        }
        
        if (shipCompanyEn != null && shipCompanyEn != ""){
        	
            paraStr += "&shipCompanyEn=" + shipCompanyEn;
        
        }
        
        return paraStr;
		
	}
		//删除船公司
		function delShipCompany(shipCompanyId){
			window.location.href="/ship/delShipCompany?shipId="+shipCompanyId;
		}
		// 菜单信息框点击右上角X
		$('#closeX').click(function(){
			
			$('#error').html('').css('display','none');
			
            $('#shipCompany').modal('hide');
            
		});
		//展示添加船公司弹框
		$("body").on("click", "#addShipCompany", function(){
			$('#ship')[0].reset();// 清空表单
			$('#shipCompany').modal('show');
		})
		
		//检查船公司名称是否可用
		function checkShipName(){
			var shipCompanyName=$('#shipCompanyName').val();
			var shipCompanyEn=$('#shipCompanyEn').val();
				$.ajax({
					type : 'POST',
					
					url : '/ship/addShipCompany',
					
					data : {'shipCompanyName':shipCompanyName,'shipCompanyEn':shipCompanyEn},
					
					dataType : 'json',
					
					async : false, 
					
					success: function(data) {
						if (data.ecode !="000000"){
							if (data.ecode == "201001") {
								window.location.href="/login";
							}else{
								alert(data.emsg);
							}
							}else {
								window.location.href="/ship/allShipCompany";
						}
						
					}
				});
		}
		
		
		/*$('#save').click(function(){
			
			formSubmit();
		})*/
		
	