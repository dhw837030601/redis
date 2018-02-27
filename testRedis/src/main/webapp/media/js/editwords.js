var SensitiveWordsEdit = function () {
    
    return {
        init: function () {
        	var pIsDraft = 1;

			$('#saveBtn').click(function(){
				pIsDraft = 0;
				mySubmit();
                if ($('.form-edit').validate().form()) {
                }
                return false;
			});
			$('#cancelBtn').click(function(){
        		if(window.confirm('你确定要放弃本次编辑吗？')){
            	     window.location.href='/sensitivewords/wordslist';
                	 return true;
	              }else{
    	             return false;
        	     }
  				
			});
	        var mySubmit = function() {
	        	var id=$("input[name='id']").val();
	        	var key_word = $("input[name='key_word']").val();
	        	var grade = $("input[name='grade']").val();
	        	var remark = $("textarea[name='remark']").val();
				var category = $("#category").val();
				var status = $("#status").val();

				var pParam = "";
				if (id !== null && id !==undefined && id !=="" && id != "-1")
					pParam += "id=" + id;
				if (key_word !== null && key_word !==undefined)
					pParam += "&key_word=" + key_word;
				if (grade !== null && grade !==undefined)
					pParam += "&grade=" + grade;
				if (remark !== null && remark !==undefined)
					pParam += "&remark=" + remark;
				if (category !== null && category !==undefined)
					pParam += "&category=" + category;
				if (status !== null && status !==undefined)
					pParam += "&status=" + status;
				
				$("#myDlg1").modal('show');
				$.ajax({
					type:"POST",
					url:"/sensitivewords/doeditwords",
					data:pParam,
					dataType:"JSON",
					success: function(data) {
						var ecode = data.ecode;
						var emsg = data.emsg;
						if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
							 $("#myDlg1").modal('hide');
							$('.alert-error', $('.form-edit')).text(emsg).show();
						}else {
							window.location.href='/sensitivewords/wordslist';

						}
					},
					error: function(e) { 
						$('.alert-error', $('.form-edit')).text(e.status+":"+ e.statusText).show();
					} 
				});
        	}
        }



    };

}();