var page = require('webpage').create(),
    system = require('system'),
    fs = require("fs"),
    t, 
    address;

t = Date.now();
// address = system.args[1];

var file = fs.open("./page.json", 'r');
var pageList = JSON.parse(file.read());
// console.log(pageList);
file.close();

console.log('---------------------------------');


for(var i=0; i<pageList.length; i++){
  (function(i){
    console.log(i);
    openPage(pageList[i],i);
    // if(i === pageList.length) phantom.exit(0);
  })(i);
}


page.settings = {
  resourceTimeout : 5000
};


function openPage(pageUrl,i){
  page.open(pageUrl, function(status) {
    if (status !== 'success') {
      console.log('页面打开失败');
    } else {
      t = Date.now() - t;
      console.log('加载时间' + t + ' ms');
    }

    page.onError = function(msg,trace){
      console.log(msg);
      var msgStack = ['PHANTOM ERROR: ' + msg];
      if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
          msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
        });
      }
      console.error(msgStack.join('\n'));
      phantom.exit(1);
    };

    page.onResourceError = function(resourceError) {
      console.log('错误类型:onResourceError');
      console.log('错误页面行号' + i);
      console.log('资源加载错误的链接' + resourceError.url);
      console.log('错误代码: ' + resourceError.errorCode);
      console.log('描述: ' + resourceError.errorString);
      console.log('---------------------------------');
    };

    page.onResourceTimeout = function(request) {
      console.log('错误类型:onResourceTimeout');
      console.log('错误页面行号' + i);
      console.log('资源加载错误的链接' + request.url);
      console.log('错误代码: ' + request.errorCode);
      console.log('描述: ' + request.errorString);
      console.log('---------------------------------');
    };
    // phantom.exit(0);
    // page.close();
  });
}



phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};
