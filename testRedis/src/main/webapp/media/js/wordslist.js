var SensitivewordsList = function () {
    var handlePagination = function(pageNum) {
        var pidx = GetQueryString("pIndex");
        if (pidx == null)
            pidx = 1;
        $('#pager').bootpag({
            total: pageNum,
            page: pidx,
            maxVisible: 6 
        }).on('page', function(event, num){
            var key_word = $('#key_word_id').val();
            var grade = $('#grade_id').val();
            var category = $('#category_id').val();
            var status = $('#status_id').val();
            var id = $('#id').val();
            var paraStr = "pIndex=" +num;
            if (key_word != null &&key_word !="")
            	key_word += "&key_word=" + key_word;
            if (grade != null&&grade !=0)
            	paraStr += "&grade=" +grade;
            if (category != null && category !="-1")
            	paraStr += "&category=" +category;
            if (status != null && status !="-1")
            	paraStr += "&status=" +status;
            if (id != null && id !="")
                paraStr += "&id=" +id;
            window.location.href='/sensitivewords/wordslist?'+paraStr;
        });

    }


    var GetQueryString = function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }



    return {
        //main function to initiate the module
        init: function (pageNum) {
            handlePagination(pageNum);
        }

    };

}();


function deleteWordsById(id){
	
	if(window.confirm('你确定要删除这条数据吗？')){
		$.ajax({
			type:"POST",
			url:"/sensitivewords/deleteWordsById?id="+id,
			dataType:"JSON",
			success: function(data) {
				var ecode = data.ecode;
				var emsg = data.emsg;
				if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
					alert(emsg);
				}else {
					window.location.href='/sensitivewords/wordslist';

				}
			},
			error: function(e) { 
				alert(emsg);
			} 
		});
   	 	return true;
     }else{
        return false;
     }

}


