﻿var utils=require("./utils");
//产品密钥ID，产品标识 
var secretId="your_secret_id";
// 产品私有密钥，服务端生成签名信息使用，请严格保管，避免泄露 
var secretKey="your_secret_key";
// 易盾反垃圾云服务文档解决方案结果查询获取接口地址
var apiurl="http://as-file.dun.163.com/v1/file/query";

//请求参数
var post_data = {
	// 1.设置公有有参数
	secretId:secretId,
	version:"v1.1",
	timestamp:new Date().getTime(),
	nonce:utils.noncer(),
	signatureMethod:"MD5", // MD5, SM3, SHA1, SHA256
};
var taskIds=["ecac3bc976674c36bfc5c06445243306"];
post_data.taskIds=JSON.stringify(taskIds);
var signature=utils.genSignature(secretKey,post_data);
post_data.signature=signature;
//http请求结果
var responseCallback=function(responseData){
	console.log(responseData);
	var data = JSON.parse(responseData);
	var code=data.code;
	var msg=data.msg;
	if(code==200){
		var result=data.result;
		if(result.length==0){
			console.log("无数据");
		}else{
			for(var i=0;i<result.length;i++){
				var obj=result[i];
				var dataId=obj.dataId;
				var taskId=obj.taskId;
                var result=obj.result;
                console.log("SUCCESS:dataId="+dataId+",taskId="+taskId+",result="+result);
			}
		}
	}else{
		 console.log('ERROR:code=' + code+',msg='+msg);
	}
}
utils.sendHttpRequest(apiurl,"POST",post_data,responseCallback);