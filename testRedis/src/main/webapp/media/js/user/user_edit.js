var userEdit = {
	URL:{
		
	},
	addOrUpdate:function(){
		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		
		var mobile = $("#mobile").val().trim();
		var nickName = $("#nickName").val().trim();
		var pwd = $("#pwd").val().trim();
		var email = $("#email").val().trim();
		$("#introduction").val( CKEDITOR.instances.PsIntroduction.getData())
		
		if(isNullOrEmpty(mobile) && isNullOrEmpty(nickName)){
			$("#addUserError").text("昵称和手机号不能都为空！");
			return;
		}
		//验证手机号
		if(isNullOrEmpty(mobile) && !isValidMobile(mobile)){
			$("#mobileError").text("手机号格式错误！");
			return ;
		}
		//验证密码
		if(isNullOrEmpty(pwd)){
			$("#passwordError").text("密码不能为空！");
			return;
		}
		if(pwd.length <6 || pwd.length >20){
			$("#passwordError").text("密码长度为6-20位！");
			return;
		}
		
		if(!isNullOrEmpty(email) && !myreg.test(email)){
			$("#emailError").text("email格式不正确！");
			return;
		}
		
		
		var saltstr="HXWcjvQWVG1wI4FQBLZpQ3pWj48AV63d";
		var password=$.md5($.md5(pwd)+saltstr);
		$("#password").val(password);
		$.ajax({
			type : 'POST',
			url : '/user/saveUser',
			data : $('#addUserInfo').serializeArray(),
			dataType : 'JSON',
			async : false, 
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					$('#addUser').modal('hide');
					$("#errorMsg").text(data.emsg);
					$('#errorModal').modal('show'); // 错误信息显示
				} else {
					alert("操作成功！");
					// 刷新页面
					//location.reload();
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
	},
		
	init:function(){
	},
	
}

function isNullOrEmpty(val) {
	return (val == null || val == undefined || val == "" || val == "undefined");
}
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