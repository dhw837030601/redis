	
function ReadExcel() {  
	//得到文件路径的值  
	filePath = "/media/js/robot.csv";
	d3.csv(filePath,function(error,csvdata){  
	    if(error){  
	        console.log(error);  
	    }  
	    console.log(csvdata);  
	    $("#upfile").val(csvdata[0].头像路径);
	    $('#upfile').uploadifyUpload();
	}); 
}

var name = "";
$(function(){
	$("#uploadify").uploadify({
		'uploader' : '/media/js/jquery.uploadify-v2.1.0/uploadify.swf',
		'script' : '/user/uploadCvs',
		'cancelImg' : '/media/js/jquery.uploadify-v2.1.0/cancel.png',
		'folder' : ' UploadFile',
		'fileDataName' : 'uploadify',
		'queueID' : 'fileQueue1',
		'auto' : false,
		'multi' : true,
		'method' : 'Post',
		'wmode' : 'transparent',
		'fileExt':'*.gif;*.png;*.jpg;*.jpeg;*.bmp;*.ico',
		'fileDesc':'请选择后缀为.gif、.png、.jpg、.jpeg、.bmp、.ico的文件',
		'fileSizeLimit':5120,
		'sizeLimit' : 5120*2880,
		'fileTypeExts':'*.gif;*.png;*.jpg;*.jpeg;*.bmp;*.ico',
		'onSelect' : function (event, queueID, fileObj){ 
			 $("#uploadInfo").css("display","block");
			$('#fileQueue1').show();
			$('#prompt').html('正在解析中，请勿关闭...');
		}, 
		'onCancel':function(event,queueId,fileObj,data){
			flag1=true;
			if(!flag1||!flag2){
				$('#divClose').attr('disabled',true);
			}else{
				$('#divClose').removeAttr("disabled");
			}
		},
		'onComplete' : function(event, queueID, fileObj, response, data) {
			console.log(fileObj);
			var dataInfo = JSON.parse(response);
			var obj = dataInfo;
			console.log( obj.adata.key);
			if(obj.ecode == AiwueErrEnum.ERR_COMMON_SUCCESS.errcode){
				name += obj.adata.key+",";
				console.log("图片上传成功，上传后的名称为" + obj.adata.key);
				var html = "图片上传成功，上传后的名称为" + obj.adata.key + "</br>";
				$("#uploadInfo").append(html);
			}else{
				var html = "图片上传失败，上传后的名称为" + obj.adata.uploadifyFileName + "</br>";
				$("#errorCode").append(html);
			}
			
		},
		 'onAllComplete' : function(event,data) {
			 console.log("1");
			 console.log(name);
			 $("#picName").val(name);
			 name = "";
			 
			 //显示下一步操作（上传excel）
			 $("#showButton").css("display","block");
			 $("#fileQueue1").css("display","none");
			 
		 }
	});
	
	$("#uploadifyExcel").uploadify({
		'scriptData': {'picName':$("#picName").val()},
		'uploader' : '/media/js/jquery.uploadify-v2.1.0/uploadify.swf',
		'script' : '/user/createRobotAccount',
		'cancelImg' : '/media/js/jquery.uploadify-v2.1.0/cancel.png',
		'folder' : ' UploadFile',
		'fileDataName' : 'uploadify',
		'queueID' : 'fileQueue2',
		'auto' : false,
		'multi' : false,
		'method' : 'Post',
		'wmode' : 'transparent',
		'fileExt':'*.xlsx',
		'fileDesc':'请选择后缀为.xlsx的文件',
		'fileSizeLimit':5120,
		'sizeLimit' : 5120*2880,
		'fileTypeExts':'*.gif;*.png;*.jpg;*.jpeg;*.bmp;*.ico',
		'onSelect' : function (event, queueID, fileObj){ 
			$('#prompt').html('正在解析中，请勿关闭...');
			var picName = $("#picName").val();
			$("#errorCode1").text("");
			$("#uploadifyExcel").uploadifySettings('scriptData',{'picName':picName});
		}, 
		'onCancel':function(event,queueId,fileObj,data){
			flag1=true;
			if(!flag1||!flag2){
				$('#divClose').attr('disabled',true);
			}else{
				$('#divClose').removeAttr("disabled");
			}
		},
		'onComplete' : function(event, queueID, fileObj, response, data) {
			console.log(fileObj);
			var dataInfo = JSON.parse(response);
			var obj = dataInfo;
			console.log( obj.adata.key);
			if(obj.ecode == AiwueErrEnum.ERR_COMMON_SUCCESS.errcode){
				$("#errorCode1").append("上传成功<br/>" + obj.adata.error);
			}else{
				$("#errorCode1").append(obj.adata.error);
			}
			
		}
	});
})

function showExcelUpload(){
	$("#uploadExcel").css("display","block");
	$("#uploadPic").css("display","none");
}

