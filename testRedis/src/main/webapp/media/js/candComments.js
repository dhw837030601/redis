var CandComments = function () {
	
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
        	
            window.location.href='/sysManager/candCommentlist?' + parameters;
            
        });

    }
    
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	// 分页
        	handlePagination(pageNum);

           $('#candComment').validate({
        	   
	            errorElement: 'span', // 错误提示的标签
	            errorClass: 'help-block', // 错误提示的样式
	            focusInvalid: false, // 提交表单后，未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）是否会获得焦点
	            
	            // 要验证的信息
	            rules: {
	            	
	            	cont: {
	                    required: true
	                }
	                
	            },

	            // 错误提示信息
	            messages: {
	            	
	            	departmentType: {
	            		required: "内容必填"
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
				
                if ($('#candComment').validate().form()) {
                	
                	formSubmit();
                	
                }
                
                return false;
                
			});
			
			// 部门信息框点击关闭
			$('#closeSave').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#candCommentInfo').modal('hide');
                
			});
			
			$('#closeDetail').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#candCommentDetail').modal('hide');
                
			});
			
			$("#closeExport").click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#exportCandComment').modal('hide');
                
			});
			
			// 部门信息框点击右上角X
			$('#closeX').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#candCommentInfo').modal('hide');
                $('#candCommentDetail').modal('hide');
                $('#exportCandComment').modal('hide');
                
			});
			
			// 部门信息框点击右上角X
			$('.close').click(function(){
				
				$('#error').html('').css('display','none');
				
                $('#candCommentInfo').modal('hide');
                $('#candCommentDetail').modal('hide');
                $('#exportCandComment').modal('hide');
                
			});
			
			// 删除时确定按钮
			$('#doDel').click(function(){
				
                $('#delPrompt').modal('hide');
                
                delCandComment();
                
			});
			
			// AJAX提交要保存的信息
	        var formSubmit = function() {
	        	
				$.ajax({
					
					type : 'POST',
					
					url : '/sysManager/saveCandComments',
					
					data : $('#candComment').serializeArray(),
					
					dataType : 'JSON',
					
					async : false, 
					
					success: function(data) {
						
						var ecode = data.ecode;
						
						var emsg = data.emsg;
						
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							
							$('#error').html(emsg).css('display','block'); // 错误信息显示
							
						} else {
							
							// 清空表单
							$('#candComment')[0].reset();
							
							// 刷新页面
							window.location.href='/sysManager/candCommentlist';

						}
						
					},
					
					error: function(e) { 
						
						if (e.responseText=='norole') {
        					
        					window.location.href='/norole';
        					
        				}else {

    						$('#candCommentInfo').modal('show');
    						
    						$('#error').show(); // 错误信息显示
        					
        				}
						
					} 
					
				});
				
        	};
        	
        	// AJAX删除部门
        	var delCandComment = function (){
        		
        		var id = $('input[name="delCandId"]').val();
        		
        		$.ajax({
        			
        			type : 'POST',
        			
        			url : '/sysManager/deleteCandComments',
        			
        			data : 'id='+id,
        			
        			dataType : 'JSON',
        			
        			success: function(data) {
        				
        				var ecode = data.ecode;
        				
        				var emsg = data.emsg;
        				
        				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
        					
        					$('#errorMsg').html(emsg);
        					
        					$('#errorModal').modal('show'); // 显示错误
        					
        				} else {
        					
        					// 刷新页面
        					window.location.href='/sysManager/candCommentlist';
        					
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

//详情
var goDetail = function(id){
	$.ajax({
		
		type : 'POST',
		
		url : '/sysManager/candCommentsDetail',
		
		data : 'id='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				
				$('#contentDetail').val(data.adata.content);
				
				$('#candCommentDetail').modal('show'); // 显示部门信息编辑框
				
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
}

var goModify = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应部门，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$.ajax({
		
		type : 'POST',
		
		url : '/sysManager/candCommentsDetail',
		
		data : 'id='+id,
		
		dataType : 'JSON',
		
		success: function(data) {
			
			var ecode = data.ecode;
			
			var emsg = data.emsg;
			
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				
				$('#errorMsg').html(emsg);
				
				$('#errorModal').modal('show'); // 显示错误
				
			} else {
				
				// 填充数据
				$("#candId").val(id);
				
				$('#content').val(data.adata.content);
				
				$('#type').val(data.adata.type);
				
				$('#validTime').val(data.adata.validTime);
				
				$('#candCommentInfo').modal('show'); // 显示部门信息编辑框
				
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

var toAddCandComments = function(){
	
	// 清空表单
	$('#candComment')[0].reset();
	
	$('#candCommentInfo').modal('show');
	
};

var doDelete = function(id){
	
	$('#errorMsg').html(''); // 清空错误信息
	
	if (id == '') { // ID为空提示错误信息
		
		$('#errorMsg').html('未找到对应部门，请重新操作');
		
		$('#errorModal').modal('show');
		
		return;
	}
	
	$('input[name="delCandId"]').val(id);
	
	$('#delPrompt').modal('show');
	
};

var toExport = function(){
	$('#exportCandComment').modal('show');
}


function GetQueryString (name){
	
    var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
    
    var r = window.location.search.substr(1).match(reg);
    
    if(r!=null) return decodeURIComponent(r[2]); return null;

}

function getQueryParameters (pIndex){
	
	var mobile = GetQueryString('mobile');// 手机号
	
    var nickName = GetQueryString('nickName');// 昵称
    
    var gendar = GetQueryString('gendar');// 性别
    
    var regTime = GetQueryString('regTime');// 注册时间
    
    if (pIndex == null || pIndex == "") {
    	
    	pIndex = 1;
		
	}
    
    var paraStr = "pIndex=" + pIndex;
    
    if (mobile != null && mobile != ""){
    	
        paraStr += "&mobile=" + mobile;
    
    }
    
    if (nickName != null && nickName != "-1"){
    	
        paraStr += "&nickName=" + nickName;
    
    }
    
    if (gendar != null && gendar != ""){
    	
        paraStr += "&gendar=" + gendar;
        
    }
    if (regTime != null && regTime != ""){
    	
    	paraStr += "&regTime=" + regTime;	
    	
    }
    
    return paraStr;
	
}

$(function(){
	
	//上传
	$("#borrowerInfoFile").uploadify({
		'uploader' : '/media/js/jquery.uploadify-v2.1.0/uploadify.swf',
		'script' : '/sysManager/exportCandCommonts',
		'cancelImg' : '/media/js/jquery.uploadify-v2.1.0/cancel.png',
		'folder' : ' UploadFile',
		'fileDataName' : 'uploadify',
		'queueID' : 'fileQueue',
		'auto' : true,
		'multi' : false,
		'fileExt' : '*.xlsx',
		'fileDesc' : '请选择xlsx文件',
		'method' : 'Post',
		'buttonImg':'/media/js/jquery.uploadify-v2.1.0/browse.png',
		'onSelect' : function(file){
			$('#fileQueue').show();
			$('#prompt').html('正在解析中，请勿关闭...');
		},
		'onComplete' : function(event, queueID, fileObj, response, data) {
			var obj = JSON.parse(response);
			console.log(obj);
			if(obj.adata.msg == '0'){
				$('#fileQueue').hide();				
				$('#prompt').html('解析失败，请使用正确的模板填写正确的信息！');
			}
			if(obj.adata.msg == '1'){
				$('#prompt').html('解析成功！');
				$('#fileQueue').hide();
				window.location.href='/sysManager/candCommentlist';
			}
		}
	});
});
