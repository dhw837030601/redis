
var user = function () {
	
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
            window.location.href='/user/userList?' + parameters;
        });
    }
    return {
        init: function (pageNum) {
        	// 分页
        	handlePagination(pageNum);
			// 员工信息框点击右上角X
			$('.closeX,.close').click(function(){
				$('#error').html('').css('display','none');
                $("#updateUserStatus").modal('hide');
                $("#addUser").modal('hide');
                $("#editNotification").modal('hide');
                $("#allotUser").modal('hide');
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
        $("#updateUserStatus").modal('hide');
        $("#addUser").modal('hide');
        $("#errorModal").modal('hide');
        $("#editNotification").modal('hide');
	});
	
	$(".checkAll").click(function(){
		$("input[name=distriSelect]").each(function(){
		 	//[0]取js对象
			console.log($(this)[0]);
			var _this = $(this)[0].checked;
			if(_this){
				$(this)[0].checked=false;
			} else{
				$(this)[0].checked=true;
			}
			});
		})
})


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
 
 var toAddStaff = function(){
	 window.location.href="/user/queryUser?from=0";
 };
 
 var toAddRobot = function(){
	 window.location.href="/user/toCreateRobotAccount";
 }

 var toAddUser = function(){
		
		$('#user')[0].reset();// 清空表单
		
		$('#userInfo').modal('show');
		
};
//添加虚拟用户
function addUser(){
	//清空提示信息
	$("#mobileError").text("");
	$("#addUserError").text("");
	$("#passwordError").text("");
	$("#nickNameError").text("");
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	
	var mobile = $("#mobile").val().trim();
	var nickName = $("#nickName").val().trim();
	var pwd = $("#pwd").val().trim();
	var email = $("#email").val().trim();
	if(isNullOrEmpty(mobile) && isNullOrEmpty(nickName)){
		$("#addUserError").text("昵称和手机号不能都为空！");
		return;
	}
	//验证手机号
	if(!isNullOrEmpty(mobile) && !isValidMobile(mobile)){
		$("#mobileError").text("手机号格式错误！");
	}
	//验证密码
	if( pwd == null || pwd == ""){
		$("#addUserError").text("密码不能为空！");
		return;
	}
	
	if(pwd.length <6 || pwd.length >20){
		$("#passwordError").text("密码长度为6-20位！");
		return;
	}
	if(!isNullOrEmpty(email) && !myreg.test(email)){
		$("#emailError").text("密码长度为6-20位！");
		return;
	}
	
	
	var saltstr="HXWcjvQWVG1wI4FQBLZpQ3pWj48AV63d";
	var password=$.md5($.md5(pwd.trim())+saltstr);
	$("#password").val(password);
		$.ajax({
			type : 'POST',
			url : '/user/saveUser',
			data : $('#addUserInfo').serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				console.log(data);
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#addUser').modal('hide');
					$("#errorMsg").text(data.emsg);
					$('#errorModal').modal('show'); // 错误信息显示
				} else {
					// 清空表单
					$('#addUserInfo')[0].reset();
					var pIndex = GetQueryString("pIndex");
					var parameters = getQueryParameters(pIndex);
					// 刷新页面
					window.location.href='/user/userList?' + parameters;
				}
			},
			error: function(e) { 
				if (e.responseText=='norole') {
					window.location.href='/norole';
				}else {
					$('#addUser').modal('hide');
					$("#errorMsg").text("操作过程中遇到未知错误，请重新操作");
					$('#errorModal').modal('show'); // 错误信息显示
				}
			} 
		});
}

var goDetail = function(id){
	window.location.href="/user/userDetail?id=" + id
};

	//修改用户状态
	var goUpdate = function (id){
		$("#updateId").val(id);
		$('#updateUserStatus').modal('show');
	}
	
	function sendMessage(){
		if(checkboxIsSelect()==1){
			alert("没有选中的要发送消息的用户");
			return;
		}
		$('#addNotification')[0].reset();// 清空表单
		$('#editNotification').modal('show');
	}
	
	function  checkboxIsSelect(){
		var distriSelect=document.getElementsByName("distriSelect");
		for(var i=0;i<distriSelect.length;i++){
			if(distriSelect[i].checked==true){
				return 0;
			}
		}
		return 1;
	}
	
	//添加虚拟用户
	function addNotification(){
		//清空提示信息
		$("#sUserIdError").text("");
		$("#rUserIdError").text("");
		$("#contentError").text("");
		
		 var  userids=new Array();
		  $("input[name='distriSelect']:checked").each(function(i){
			 var str=this.id;
			 userids[i]=str.substring(5,str.length);
		 });

		var esUserId = $("#esUserId").val();
		$("#erUserId").val(userids.join(','));
		var econtent = $("#econtent").val().trim();
		if(isNullOrEmpty(esUserId)){
			$("#sUserIdError").text("发送人不能为空！");
			return;
		}
		
		if(isNullOrEmpty(econtent)){
			$("#contentError").text("消息不能为空！");
			return;
		}
			$.ajax({
				type : 'POST',
				url : '/userNotification/saveNotification',
				data : $('#addNotification').serializeArray(),
				dataType : 'JSON',
				async : false, 
				success: function(data) {
					console.log(data);
					data = eval('(' + data + ')');
					var ecode = data.ecode;
					var emsg = data.emsg;
					if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
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
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#updateUserStatus').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("pIndex");
					var parameters = getQueryParameters(pIndex);
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
	}
	var doUpdata = function(id){
		var parameters = "?userId="+id + "&from=0";
		window.location.href='/user/queryUser' + parameters;
	}

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
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#delPrompt').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("pIndex");
					var parameters = getQueryParameters(pIndex);
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
	
	function doAllot(id){
		$("#allotId").val(id);
		$('#allotUser').modal('show');
	}
	
	function allotUser(){
		var allotId = $("#allotId").val();
		var allotor = $("#allotor").val();
		$.ajax({
			type : 'POST',
			url : '/user/allotUser',
			data : {"allotId": allotId,"allotor":allotor},
			dataType : 'JSON',
			success: function(data) {
				data = eval('(' + data + ')');
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != ErrorEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#updateUserStatus').modal('hide');
					$('#errorMsg').html(emsg);
					$('#errorModal').modal('show'); // 显示错误
				} else {
					var pIndex = GetQueryString("pIndex");
					var parameters = getQueryParameters(pIndex);
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
	}
	
	

	
	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}
//验证手机号
	
	function isValidMobile(b) {
		return isValidChinaMobileNum(b) || IsValidChinaUnicomMobileNum(b) || IsValidChinaTelecomMobileNum(b);
	}

	function isValidChinaMobileNum(b) {
		if(/(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7})$/.test(b))
			return 1;
		return 0;
	}

	function IsValidChinaUnicomMobileNum(b) {
		if(/(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7})$/.test(b))
			return 1;
		return 0;
	}

	function IsValidChinaTelecomMobileNum(b) {
		if(/(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7})$/.test(b))
			return 1;
		return 0;
	}
	// 拒绝授信信息框点击右上角X
	$('#closeX').click(function(){
        $('#userInfo').modal('hide');
	});