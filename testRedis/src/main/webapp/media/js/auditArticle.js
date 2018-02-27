var articleChild = function () {
	// 审核信息分页
	var handleAuditPagination = function(auditPageNum) {
        
        var auditIndex = GetQueryString("auditIndex");
        if (auditIndex == null){
        	
        	auditIndex = 1;
        
        }
            
        $('#pager').bootpag({
        	
            total: auditPageNum,
            
            page: auditIndex,
            
            maxVisible: 6 
            
            
        }).on('page', function(event, num){
        	
        	var parameters = getQueryParameters(pIndex);
        	var paramId = GetQueryString("id");
        	window.location.href= "/article/articleDetail?articleId=" + $("#aId").val();
            
        });

    }
	
    return {
        init: function (auditPageNum) {
        	
        	handleAuditPagination(auditPageNum);
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
        $('#userInfo').modal('hide');
        $("#updateUser").modal('hide');
        $("#addUser").modal('hide');
        $("#errorModal").modal('hide');
        $('#change_good_show').modal('hide');
        $('#change_status_show').modal('hide');
	});
	
})

    //通过name属性获取input的value
    function GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }

	//封装参数 
     function getQueryParameters(pIndex){
		
	    var type = $('input[name="type"]').val();
		var subType = $('input[name="subType"]').val();
		var status = $('input[name="status"]').val();
		var priority = $('input[name="priority"]').val();
	    
	    var paraStr = "?";
	    
	    if (pIndex == null || pIndex == "") pIndex = 1;
	    paraStr += "pIndex=" + pIndex;
	    
	    if (type != null && type != "-1" && type !=""){
	        paraStr += "&type=" + type;
	    }
	    if (subType != null && subType !=""){
	        paraStr += "&subType=" + subType;
	    }
	    if (status != null){
	        paraStr += "&status=" + status;
	    }
	    if (priority != null){
	        paraStr += "&priority=" + priority;
	    }
	    
	    return paraStr;
	}

	function isNullOrEmpty(val) {
		return (val == null || val == undefined || val == "" || val == "undefined");
	}