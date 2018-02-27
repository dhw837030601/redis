
var user = function () {

    return {
        init: function () {
        	// 分页
			// 员工信息框点击右上角X
			$('.closeX,.close').click(function(){
				$('#error').html('').css('display','none');
				 $("#errorModal").modal('hide');
		        $('#change_status_show').modal('hide'); 
		        $('#change_isMaster_show').modal('hide');
		        $('#change_memberLevel_show').modal('hide');
			});
			if (jQuery().datepicker) {
                $('.date-picker').datepicker();
            }
            App.initFancybox();
        }
    };
}();

$(function(){
	$('.close').click(function(){
		$('#error').html('').css('display','none');
        $("#errorModal").modal('hide');
        $('#change_status_show').modal('hide'); 
        $('#change_isMaster_show').modal('hide');
        $('#change_memberLevel_show').modal('hide');
	});
	
	// 修改状态
	$(".saveStatus").click(function(){
		$.ajax({
			type : 'POST',
			url : '/user/updateStatus',
			data : {userId:$("#userIdUpdate").val(),status:$("#status_update").val()},
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					window.parent.location.href="/user/userDetail?id=" + $("#userIdUpdate").val();
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
	});
	
	// 修改是否教练
	$(".saveIsMaster").click(function(){
		$.ajax({
			type : 'POST',
			url : '/user/updateIsMaster',
			data : {userId:$("#userIdUpdate").val(),isMaster:$("#isMaster_update").val()},
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					window.parent.location.href="/user/userDetail?id=" + $("#userIdUpdate").val();
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
	});
	
	// 修改会员级别
	$(".saveMemberLevel").click(function(){
		$.ajax({
			type : 'POST',
			url : '/user/updateMemberLevel',
			data : {userId:$("#userIdUpdate").val(),memberLevel:$("#memberLevel_update").val()},
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					window.parent.location.href="/user/userDetail?id=" + $("#userIdUpdate").val();
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
	});
	
});

	var goDetail = function(id){
		window.location.href="/user/userDetail?id=" + id
	};
	
	/*更改状态*/
	var updateStatus = function(id){
		$("#userIdUpdate").val(id);
		$('#change_status_show').modal('show');
	};
	
	/*更改是否教练*/
	var updateIsMaster = function(id){
		$("#userIdUpdate").val(id);
		$('#change_isMaster_show').modal('show');
	};
	
	/*更改会员级别*/
	var updateMemberLevel = function(id){
		$("#userIdUpdate").val(id);
		$('#change_memberLevel_show').modal('show');
	};
	
	//修改用户状态
	var goUpdate = function (id){
		$("#updateId").val(id);
		$('#updateUserStatus').modal('show');
	};


	function updateUser(){
		var updateId = $("#updateId").val();
		var status = $("#updateStatus").val();
		$.ajax({
			type : 'POST',
			url : '/user/updateUser',
			data : {"id": updateId,"status":status},
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#updateUserStatus').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					window.location.href='/user/userList?' + parameters;
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
	var doUpdata = function(id){
		var parameters = "?userId="+id + "&from=1";
		window.parent.location.href='/user/queryUser' + parameters;
	};

	var doDelete = function(id){
		$('#errorMsg').html(''); // 清空错误信息
		if (id == '') { // ID为空提示错误信息
			$('#errorMsg').html('未找到对应员工信息，请重新操作');
			$('#errorModal').modal('show');
			return;
		}
		$('input[name="delUserId"]').val(id);
		$('#delPrompt').modal('show');
	};

	// AJAX删除用户
	function delUser(){
		$('#delPrompt').modal('hide');
		var id = $('input[name="delUserId"]').val();
		$.ajax({
			type : 'POST',
			url : '/user/deleteUser',
			data : 'id='+id,
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					// 刷新页面
					window.location.href="/user/userInfo?id=" + id;
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
	
	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	};