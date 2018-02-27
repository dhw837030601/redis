var policyBase64="";
var signature = "";
var accessid = "";
var host = ""; 
var derPathName = courseVideoBucket;
var dirname = "";

var now = expire = Date.parse(new Date()) / 1000; 
var object_Path_name = ''; //上传文件名（oss上传路径）
var object_name = '';//文件名
var canUpload = false;//是否可以提交，默认不可以

 //判断时间是否超时
function get_signature(){
	//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = Date.parse(new Date()) / 1000; 
    if (expire < now + 3){
        send_request();
    }
}

function send_request(){
	$.ajax({
		type:"POST",
		url:"/pic/getDataForVideo",
		data : {},
		dataType:"JSON",
		async : false, 
		success: function(data) {
			var ecode = data.ecode;
			var emsg = data.emsg;
			if (ecode != AiwueErrEnum.ERR_COMMON_SUCCESS.errcode) {
				 $("#add_content2_show").modal('hide');
				 $("#errorMsg").text("操作过程出现异常");
				 $('#errorModal').show();
			}else {
				canUpload = true;
				policyBase64 = data.adata.policy;
				signature = data.adata.signature;
				accessid = data.adata.accessid;
				host = data.adata.host;
		        expire = parseInt(data.adata.expire);
		        
			}
		},
		error: function(e) {
			$("#add_content2_show").modal('hide');
			$("#errorMsg").text("操作过程出现异常，请重新登录！");
			$('#errorModal').show();
		} 
	});
};

function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	var maxPos = chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
	　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

function get8Lentgh(value){
	for (var i = 0; i < value.length; i++) {
		if(value.length<8)
			value = "0"+value;
	}
	return value;
}

function get_suffix(filename) {
	var suffix = '.mp4'
	if(filename == ""){
		return suffix;
	}
    var pos = filename.lastIndexOf('.')
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

//提交上传
function set_upload_param(up,filename){
	//上传文件名
	dirname = 'course_'+get8Lentgh(document.getElementById('parentId').value)+'_'+get8Lentgh(document.getElementById('courseId').value)+'_'+random_string(5);
	var suffix = get_suffix(filename);
	object_Path_name = derPathName+dirname + suffix;
	object_name = dirname + suffix;
	
	var new_multipart_params = {
	    'key' : object_Path_name,
	    'policy': policyBase64,
	    'OSSAccessKeyId': accessid, 
	    'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
	    'signature': signature,
	};
	
	up.setOption({
	    'url': host,
	    'multipart_params': new_multipart_params
	});
	
	if(canUpload){
		up.start();
	}
}

var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button : 'selectfiles', 
	multi_selection: true,
	container: document.getElementById('container'),
	flash_swf_url : '/media/plugs/lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : '/media/plugs/lib/plupload-2.1.2/js/Moxie.xap',
	url : 'http://www.wallet.com',
	filters: {
		mime_types : [ //只允许mp4文件
		{ title : "Video files", extensions : "mp4" }
		],
		max_file_size : '400mb', //最大只能上传400kb的文件
		prevent_duplicates : true //不允许选取重复文件
	},
	init: {
		PostInit: function() {
			//判断授权时间是否超时
			get_signature();
			document.getElementById('ossfile').innerHTML = '';
			//上传事件
			document.getElementById('postfiles').onclick = function() {
	        	set_upload_param(uploader,"");
	        	return false;
			};
		},
	
		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>';
			});
		},
	
		BeforeUpload: function(up, file) {
			//判断授权时间是否超时
			get_signature();
			//上传
	        set_upload_param(up,file.name);
	    },
	
		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
	        var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0];
			progBar.style.width= 2*file.percent+'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},
	
		FileUploaded: function(up, file, info) {
	        if (info.status == 200){
	            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '文件'+object_name+'上传成功';
	            document.getElementById('media').value = object_name;
	        }else{
	            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
	        } 
		},
		Error: function(up, err) {
            if (err.code == -600) {
                document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
            }
            else if (err.code == -601) {
                document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
            }
            else if (err.code == -602) {
                document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
            }
            else {
                document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
		}
	}
});

uploader.init();