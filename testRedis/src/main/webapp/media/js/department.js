var Department = function () {
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
            window.location.href='/sysManager/departmentlist?' + parameters;
        });
    }
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	//分页
           handlePagination(pageNum);
        	
           $('#department').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            rules: {
	            	
	            	departmentType: {
	                    required: true,
	                    maxlength: 5
	                },
	                
	                parentDepartmentId: {
	                    required: true,
	                    number: true
	                },
	                
	                departmentName: {
	                    required: true,
	                    maxlength: 15
	                },
	                
	                departmentCode: {
	                    required: false,
	                    maxlength: 15
	                }
	                
	            },

	            // 错误提示信息
	            messages: {
	            	
	            	departmentType: {
	            		required: "部门类型必填",
	            		maxlength: $.format("部门类型最大长度:{0}")
	                },
	                
	            	parentDepartmentId: {
	            		required: "父级部门必选",
	            		number: "请选择正确的父级部门"
	                },
	                
	            	departmentName: {
	            		required: "部门名称必填",
	            		maxlength: $.format("部门名称最大长度:{0}")
	                },
	                
	            	departmentCode: {
	            		required: "部门编码必填",
	            		maxlength: $.format("部门编码最大长度:{0}")
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

           	// 部门信息框点击保存
			$('#save').click(function(){
				
                if ($('#department').validate().form()) {
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// 部门信息框点击关闭
			$('#closeSave').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#departmentInfo').modal('hide');
                
			});
			
			// 部门信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#departmentInfo').modal('hide');
                
			});
			
			// 删除时确定按钮
			$('#doDel').click(function(){
				
                $('#delPrompt').modal('hide');
                
                delDepartment();
                
			});
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/savedepartment',
					
					data : $('#department').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#error').html(emsg).css('display','block'); // 错误信息显示
							
						} else {
							
							// 清空表单
							$('#department')[0].reset();
							
							// 刷新页面
							window.location.href='/sysManager/departmentlist';

						}
						
					},
					
					error: function(e) { 
						
						if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {

    						$('#departmentInfo').modal('show');
    						
    						$('#error').show(); // 错误信息显示
        					
        				}
						
					} 
					
				});
				
        	};
        	
        	// AJAX删除部门
        	var delDepartment = function (){
        		
        		var id = $('input[name="delDepartmentId"]').val();
        		
        		$.ajax({
        			
        			type : 'POST',
        			
        			url : '/sysManager/deldepartmen',
        			
        			data : 'departmentId='+id,
        			
        			dataType : 'JSON',
        			
        			success: function(data) {
        				
        				var ecode = data.ecode;
        				
        				var emsg = data.emsg;
        				
        				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
        					
        					$('#errorMsg').html(emsg);
        					
        					$('#errorModal').modal('show'); // 显示错误
        					
        				} else {
        					
        					// 刷新页面
        					window.location.href='/sysManager/departmentlist';
        					
        				}
        				
        			},
        			
        			error: function(e) { 
        				
        				if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {
        					
        					$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
            				
            				$('#errorModal').modal('show');
        					
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
		
		$('#errorMsg').html('未找到对应部门，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$.ajax({
		
		type : 'POST',
		
		url : '/sysManager/getdepartmentinfo',
		
		data : 'departmentId='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$('input[name="departmentId"]').val(id);
				
				$('input[name="departmentType"]').val(data.adata.departmentType);
				
				$('select[name="parentDepartmentId"]').val(data.adata.parentDepartmentId);
				
				$('input[name="departmentName"]').val(data.adata.departmentName);
				
				$('input[name="departmentCode"]').val(data.adata.departmentCode);
				
				$('#departmentInfo').modal('show'); // 显示部门信息编辑框
				
			}
			
		},
		
		error: function(e) { 
			
			if (e.responseText=='norole') {
				
				window.location.href='/norole';
				
			}else {
				
				$('#errorMsg').html('操作过程中遇到未知错误，请重新操作');
				
				$('#errorModal').modal('show');
				
			}
			
		} 
		
	});
    
};

var toAddDepartment = function(){
	
	// 清空表单
	$('#department')[0].reset();
	
	$('#departmentInfo').modal('show');
	
};

var doDelete = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应部门，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$('input[name="delDepartmentId"]').val(id);
	
	$('#delPrompt').modal('show');
	
};
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
