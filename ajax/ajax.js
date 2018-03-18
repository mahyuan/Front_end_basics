function reqListener() {
	console.log(111)
}

let oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "https://mhynet.cn", true);
oReq.send();

//
var oReq = new XMLHttpRequest();
oReq.open("GET", "http://www.mozilla.org/", true);
oReq.onreadystatechange = function (oEvent) {
  if (oReq.readyState === 4) {
    if (oReq.status === 200) {
      console.log(oReq.responseText);
    } else {
      console.log("Error", oReq.statusText);
    }
  }
};
oReq.send(null);

// 使用异步请求，不使用闭包
function switchXHRState() {
  switch (this.readyState) {
    case 0: console.log("还没调用open()方法."); break;
    case 1: console.log("还没调用send()方法."); break;
    case 2: console.log("已经调用send()方法,响应头和响应状态已经返回."); break;
    case 3: console.log("下载中,已经得到部分响应实体."); break;
    case 4: console.log("请求完成!"); this.callback.apply(this, this.arguments);
  }
};

function loadFile (sURL, fCallback /*, 传入参数1, 传入参数2, 等 */) {
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.arguments = Array.prototype.slice.call(arguments, 2);
  oReq.onreadystatechange = switchXHRState;
  oReq.open("GET", sURL, true);
  oReq.send(null);
}

// bind
function switchXHRState(fCallback, aArguments) {
  switch (this.readyState) {
    case 0: console.log("还没调用open()方法."); break;
    case 1: console.log("还没调用send()方法."); break;
    case 2: console.log("已经调用send()方法,响应头和响应状态已经返回."); break;
    case 3: console.log("下载中,已经得到部分响应实体."); break;
    case 4: console.log("请求完成!"); fCallback.apply(this, aArguments);
  }
};

function loadFile (sURL, fCallback /*, 传入参数1, 传入参数2, 等 */) {
  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = switchXHRState.bind(oReq, fCallback, Array.prototype.slice.call(arguments, 2));
  oReq.open("GET", sURL, true);
  oReq.send(null);
}



// 事件监控
var req = new XMLHttpRequest();

req.addEventListener("progress", updateProgress, false);
req.addEventListener("load", transferComplete, false);
req.addEventListener("error", transferFailed, false);
req.addEventListener("abort", transferCanceled, false);

req.open();

// progress on transfers from the server to the client (downloads)
function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  alert("The transfer is complete.");
}

function transferFailed(evt) {
  alert("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  alert("The transfer has been canceled by the user.");
}



















