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
            window.location.href='/user/userShip?' + parameters+"&userId="+userId;
            
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
	function checkShipCompanyName(){
		var shipCompanyId=$('#hiddenId').val();
		var userId=$('#userId').val();
			$.ajax({
				type : 'POST',
				
				url : '/user/addShip',
				
				data : {'shipCompanyId':shipCompanyId,'userId':userId},
				
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
							var userId=$('#userId').val();
							window.location.href="/user/userShip?userId="+userId;
					}
					
				}
			});
	}
	
	//用户模糊搜索船公司
	//展示
	function showDiv(){
		var arr=$("#itemul>li");
		if(arr.size()>0){
			$("#completeShow").slideDown(500);
		}
	}
	//隐藏
	function hideDiv(){
		$("#completeShow").slideUp(500);
	}

	//查询关键字
	function searchWord(n){
		var val=n.value;
		if(val!=""){
			$.post("/ship/showShipCompanyList",
					{word:val},
					function(data){
						if(data.ecode != HdPayErrEnum.ERR_OTHER_LUCK_DRAW_CODE_IS_ERR.errcode){
							var arr=$(data.result);
							if(arr.size()>0){
								$("#completeShow").slideDown(500);
							}else{
								$("#completeShow").slideUp(500);
							}
							var ul=$("#itemul");
							ul.html("---请选择船公司---");
							arr.each(function(index,dom){
								var temp = "<li class='list-group-item' style='list-style:none;'><a href='#' onclick='addWordToInput(this.text,"+dom.id+")' >"+dom.shipCompanyName+"【"+dom.shipCompanyEn+"】</a></li>";
								ul.append(temp);
							});
						}else{
							alert("船公司列表不存在");
						}
						
						
					},"json");
		}else{
			$("#itemul").html("");
			$("#completeShow").slideUp(500);
		}
		
	}
	function addWordToInput(word,shipCompanyId){
		$("#inputWord").val(word);
		$("#hiddenId").val(shipCompanyId);
	}