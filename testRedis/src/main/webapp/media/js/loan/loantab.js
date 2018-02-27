$(function() {
		var objname = $("#objname_hidden").val();
		var courseId = $("#courseId").val();
		if (objname == null || objname == '') {
			$("#objname_hidden").val('0');
			$("#summaryInfo_frame0").addClass("tab-pane active");
			$("#summaryInfo_frame0").load(
					"/loan/loanDetail?loanId=" + $("#loanId").val());
		} else {
			$("#summaryInfo_frame" + objname + "").removeClass();
			$("#summaryInfo_frame" + objname + "").addClass("tab-pane active");
			SelIt(objname);
		}
		
	});

function SelIt(objname) {
	if (objname == '0') {
		setActive('贷款详情',0,"/loan/loanDetail?loanId=" + $("#loanId").val() )
	} else if (objname == '1') {
		setActive('审核',1,"/audit/loanAuditRecord?loanId=" + $("#loanId").val())
	} 
}
function  setActive(titleStr,index,utlStr){
	var title = "";
	detail_title = title + titleStr;
	$("#objname_hidden").val(index);
	$("#summaryInfo_frame"+index).get(0).src=utlStr;
//	document.getElementById("title_span").innerHTML = detail_title;
}



