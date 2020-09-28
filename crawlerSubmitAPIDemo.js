var utils=require("./utils");
//产品密钥ID，产品标识 
var secretId="your_secret_id";
// 产品私有密钥，服务端生成签名信息使用，请严格保管，避免泄露 
var secretKey="your_secret_key";
// 易盾反垃圾云服务网站检测结果获取接口地址
var apiurl="http://as.dun.163.com/v1/crawler/submit";

//请求参数
var post_data = {
	// 1.设置公有有参数
	secretId:secretId,
	version:"v1.0",
	timestamp:new Date().getTime(),
    nonce:utils.noncer(),
	signatureMethod:"MD5", // MD5, SM3, SHA1, SHA256
    // 2.设置私有参数
    dataId: "6a7c754f9de34eb8bfdf03f209fcfc02",
    url: 'http://xxx.xxx.com/xxxx',
    // 多个检测项时用英文逗号分隔
    checkFlags: "1,2"
};
var signature=utils.genSignature(secretKey,post_data);
post_data.signature=signature;

//http请求结果
var responseCallback=function(responseData){
	console.log(responseData);
    var data = JSON.parse(responseData);
    var code = data.code;
    var msg = data.msg;
    if (code === 200) {
        var result = data.result;
        var dataId = result.dataId;
        var taskId = result.taskId;
        console.log('SUBMIT SUCCESS:taskId=' + taskId + ',dataId=' + dataId)
    } else {
        console.log('ERROR:code=' + code + ',msg=' + msg)
    }
}
utils.sendHttpRequest(apiurl, 'POST', post_data, responseCallback)