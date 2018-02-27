var city = function () {
	
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
        	
            window.location.href='/sysManager/cityList?' + parameters;
            
        });

    }
	
	var GetQueryString = function(name){
		
        var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
        
        var r = window.location.search.substr(1).match(reg);
        
        if(r!=null) return decodeURIComponent(r[2]); return null;
   
	}
	
	var getQueryParameters = function(pIndex){
		
		var queryCityName = GetQueryString('queryCityName');// 城市名称
		var queryParentId = GetQueryString('queryParentId');// 城市名称
    	
        
        if (pIndex == null || pIndex == "") {
        	
        	pIndex = 1;
			
		}
        
        var paraStr = "pIndex=" + pIndex;
        
        if (queryCityName != null && queryCityName != ""){
        	
            paraStr += "&queryCityName=" + queryCityName;
        }
        if (queryParentId != null && queryParentId != ""){
        	
            paraStr += "&queryParentId=" + queryParentId;
        }
        
        return paraStr;
		
	}
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
        	$('#city').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            rules: {
	            	
	            	cityName: {
	            		required: true,
	            		maxlength: 15
	                }
	                
	            },

	            // 错误提示信息
	            messages: {
	            	
	            	cityName: {
	            		required: '城市名称必填',
	            		maxlength: $.format('城市名称最大长度:{0}')
	                },
	                
	                cityCode: {
	            		maxlength: $.format('城市编码最大长度:{0}')
	                },
	                
	                cityPriority: {
	            		required: '城市优先级必填',
	            		number: '请填写正确的优先级'
	                },
	                
	                parentNavigator: {
	                	required: '父级城市必选',
	            		number: '请选择正确的父级城市'
	                },
	                
	                consoleUrl: {
	            		maxlength: $.format('访问路径最大长度:{0}')
	                }
	                
	            },

	            // 验证不通过
	            highlight: function (element) { 
	            	
	                $(element).closest('.control-group').addClass('error'); 
	                
	            },

	            // 验证通过
	            success: function (label) {
	            	
	                label.closest('.control-group').removeClass('error');
	                
	                label.remove();
	                
	            },

	            // 错误提示位置
	            errorPlacement: function (error, element) {
	            	
	            	error.appendTo(element.parent());
	            	
	            },

	        });

           	// 城市信息框点击保存
			$('#save').click(function(){
				
                if ($('#city').validate().form()) {
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// 城市信息框点击关闭
			$('#closeSave').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#cityInfo').modal('hide');
                
			});
			
			// 城市信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#cityInfo').modal('hide');
                
			});
			
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/saveCity',
					
					data : $('#city').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#error').html(emsg).css('display','block'); // 错误信息显示
							
						} else {
							
							// 清空表单
							$('#city')[0].reset();
							
							var pIndex = GetQueryString("pIndex");
							
							var parameters = getQueryParameters(pIndex);
							
							// 刷新页面
							window.location.href='/sysManager/cityList?' + parameters;

						}
						
					},
					
					error: function(e) { 
						
						if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {
        					
        					$('#cityInfo').modal('show');
    						
    						$('#error').show(); // 错误信息显示
    						
        				}
						
					} 
					
				});
				
        	};
        	
        }
    
    };

}();

var goModify = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应角色信息，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$.ajax({
		
		type : 'POST',
		
		url : '/sysManager/getCityInfo',
		
		data : 'cityId='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$('input[name="cityId"]').val(id);
				
				$('input[name="cityName"]').val(data.adata.cityName);
				
				$('input[name="parentId"]').val(data.adata.parentId);
				
				$('#cityInfo').modal('show'); // 显示城市信息编辑框
				
			}
			
		},
		
		error: function(e) { 
			
			$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
			
			$('#errorModal').modal('show');
			
			return;
			
		} 
		
	});
    
};

var toAddCity = function(){
	
	$('#city')[0].reset();// 清空表单
	
	$('#cityInfo').modal('show');
	
};

function queryChild(id){
	
	$('input[name="queryParentId"]').val(id);
	
	window.location.href='/sysManager/cityList?queryParentId=' + id;
}

