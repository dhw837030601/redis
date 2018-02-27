//字符验证      

jQuery.validator.addMethod("stringCheck", function(value, element) {
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");

//密码只能是数字、字母与下划线
jQuery.validator.addMethod("password", function(value, element) {
	return this.optional(element) || /^\w+$/.test(value);
}, "只能是数字、字母与下划线");

//身份证号码验证       
jQuery.validator.addMethod("isIdCardNo", function(value, element) {
	var idCardNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	return this.optional(element) || (idCardNo.test(value));
}, "请正确输入您的身份证号码");

//手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (mobile.test(value));
}, "请正确填写您的手机号码");

//电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {
	var tel = /^0(10|2[0-5789]|\\d{3})\\d{7,8}$/; //电话号码格式010-12345678   
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");

//邮政编码验证       
jQuery.validator.addMethod("isZipCode", function(value, element) {
	var tel = /^[0-9]{6}$/;
	return this.optional(element) || (tel.test(value));

}, "请正确填写您的邮政编码");