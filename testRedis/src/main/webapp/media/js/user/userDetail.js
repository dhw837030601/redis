$(function() {
		var objname = $("#objname_hidden").val();
		var courseId = $("#courseId").val();
		if (objname == null || objname == '') {
			$("#objname_hidden").val('0');
			$("#summaryInfo_frame0").addClass("tab-pane active");
			$("#summaryInfo_frame0").load(
					"/user/userInfo?id=" + $("#userId").val());
		} else {
			$("#summaryInfo_frame" + objname + "").removeClass();
			$("#summaryInfo_frame" + objname + "").addClass("tab-pane active");
			SelIt(objname);
		}
		
	});

function SelIt(objname) {
	if (objname == '0') {
		setActive('用户详情',0,"/user/userInfo?userId=" + $("#userId").val() )
	} else if (objname == '1') {
		setActive('交易记录',1,"/user/userOrder?userId=" + $("#userId").val())
	} else if (objname == '2') {
		setActive('贷款记录',2,"/user/userLoan?userId=" + $("#userId").val())
	} else if (objname == '3') {
		setActive('银行账号',3,"/user/userBankCard?userId=" + $("#userId").val())
	} else if (objname == '4') {
		setActive('船公司管理',4,"/user/userShip?userId=" + $("#userId").val())
	} else if(objname == '5'){
		setActive('充值管理',5,"/user/userRechargeList?userId=" + $("#userId").val())
	} else if(objname == '6'){
		setActive('提现管理',6,"/user/userWithdrawList?userId=" + $("#userId").val())
	} else if(objname == '7'){
		setActive('审核',7,"/user/userAuditList?userId=" + $("#userId").val())
	}
}
function  setActive(titleStr,index,utlStr){
	$("#objname_hidden").val(index);
	$("#summaryInfo_frame"+index).get(0).src=utlStr;
}



