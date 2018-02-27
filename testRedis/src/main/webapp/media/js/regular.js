/*
 * 正则表达式验证。
 * 
 * 后期按需求添加。
 * 
 * http://lives.iteye.com/blog/1397939
 */

var Regular = {
	
	//判断字符串是否为数字
	checkNumber:function(number){
		var re = /^-?\d+$/;
		if (!re.test(number)){
	        return false;
	    } else {
			return true;
		}
	},
	//判断正整数
	checkJustNum:function(number){
		var re = /^[0-9]*[1-9][0-9]*$/;
		if (!re.test(number)){
	        return false;
	    } else {
			return true;
		}
	},
	//判断字符串是否为汉字
	checkChinese:function(number){
		var re = /^[\u4e00-\u9fa5],{0,}$/;   
		if (!re.test(number)){
	        return false;
	    } else {
			return true;
		}
	},
	
	init:function(){
		
	},
}
function isNullOrEmpty(val) {
	return (val == null || val == undefined || val == "" || val == "undefined");
}