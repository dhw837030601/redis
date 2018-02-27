var notification = function () {
	
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
        	
            window.location.href='/userNotification/list?' + parameters;
            
        });

    }
	
    return {
        //main function to initiate the module
        init: function (pageNum) {
        	
        	// 分页
        	handlePagination(pageNum);
        	
			// 员工信息框点击右上角X
			$('.closeX').click(function(){
				$('#error').html('').css('display','none');
                $('#userInfo').modal('hide');
                $("#updateUser").modal('hide');
                $("#addUser").modal('hide');
			});
			
        }
    
    };

}();

$(function(){
	$('.close').click(function(){
		$('#error').html('').css('display','none');
        $('#notificationInfo').modal('hide');
        $("#editNotification").modal('hide');
        $("#errorModal").modal('hide');
	});
})


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

 

//添加虚拟用户
function addUser(){
	//清空提示信息
	$("#sUserIdError").text("");
	$("#rUserIdError").text("");
	$("#contentError").text("");
//	
	var esUserId = $("#esUserId").val();
	var erUserId = $("#erUserId").val().trim();
	var econtent = $("#econtent").val().trim();
	if(isNullOrEmpty(esUserId)){
		$("#sUserIdError").text("发送人不能为空！");
		return;
	}
	if(isNullOrEmpty(erUserId)){
		$("#rUserIdError").text("接收人不能为空！");
		return;
	}
	if(isNullOrEmpty(econtent)){
		$("#contentError").text("消息不能为空！");
		return;
	}
		$.ajax({
			type : 'POST',
			url : '/userNotification/replyNotification',
			data : $('#addNotification').serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				console.log(data);
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#editNotification').modal('hide');
					$("#errorMsg").text(data.emsg);
					$('#errorModal').modal('show'); // 错误信息显示
				} else {
					// 清空表单
					$('#addNotification')[0].reset();
					var pIndex = GetQueryString("pIndex");
					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href='/userNotification/list?' + parameters;
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#editNotification').modal('hide');
					$("#errorMsg").text("操作过程中遇到未知错误，请重新操作");
					$('#errorModal').modal('show'); // 错误信息显示
				}
			} 
		});
}

var goDetail = function(id){
	$('#errorMsg').html(''); // 清空错误信息
	if (id == '') { // ID为空提示错误信息
		$('#errorMsg').html('未找到对应用户信息，请重新操作');
		$('#errorModal').modal('show');
		return;
	}
	$.ajax({
		type : 'POST',
		url : '/userNotification/userNotificationDetail',
		data : 'id='+id,
		dataType : 'JSON',
		success: function(data) {
			var ecode = data.ecode;
			var emsg = data.emsg;
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				$('#userInfo').modal('hide');
				$('#errorMsg').html(emsg);
				$('#errorModal').modal('show'); // 显示错误
			} else {
				$('#content').text(data.adata.content);
				$("#notificationInfo").modal('show');;
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

	//回复用户信息
	var goReply = function (id){
		$("#updateId").val(id);
		$.ajax({
			type : 'POST',
			url : '/userNotification/userNotificationDetail',
			data : 'id='+id,
			dataType : 'JSON',
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#userInfo').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 填充数据
					$('select[name="sUserId"]').val(data.adata.sUserId);
					$('#erUserId').val(data.adata.rUserId);
					$('#econtent').val(data.adata.content);
					$('select[name="souType"]').val(data.adata.sType);
					$('#esouId').val(data.adata.souId);
					$('#editNotification').modal('show');
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


	
	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}
