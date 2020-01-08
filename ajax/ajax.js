var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=false'

function ajaxDemo1() {
  const  reqListener = function (res) {
    console.log('res', res);
  }

  let oReq1 = new XMLHttpRequest();
  // oReq1.addEventListener('load', reqListener)
  oReq1.open("GET", url, true);
  oReq1.send();

  var oReq2 = new XMLHttpRequest();
  oReq2.open("GET", url, true);
  oReq2.onreadystatechange = function (oEvent) {
    if (this.readyState === 4) {
      if (this.status === 200) {
        // console.log(this.response);
        console.log(this.responseText);
      } else {
        console.log("Error", this.statusText);
      }
    }
  };
  oReq2.send();
}
// ajaxDemo1()

function ajaxDemo2(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.onload = () => {
      resolve(xhr.responseText)
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.open(method, url, true)
    xhr.send()
  })
}
ajaxDemo2('GET', url)
  .then(res => {
    console.log('---res---\n', res);
  }).catch(e => {
    console.error('---error---\n',e);
  })




function loadFile1 (sURL, fCallback /*, 传入参数1, 传入参数2, 等 */) {
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
  var oReq = new XMLHttpRequest();
  oReq.callback = fCallback;
  oReq.arguments = Array.prototype.slice.call(arguments, 2);
  oReq.onreadystatechange = switchXHRState;
  oReq.open("GET", sURL, true);
  oReq.send(null);
}

loadFile1(url, (res) => {
  console.log('======loadFile1======',res);
})


function loadFile2 (sURL, fCallback /*, 传入参数1, 传入参数2, 等 */) {
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
  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = switchXHRState.bind(oReq, fCallback, Array.prototype.slice.call(arguments, 2));
  oReq.open("GET", sURL, true);
  oReq.send(null);
}

function listener() {
  // 事件监控
  var req = new XMLHttpRequest();

  req.addEventListener("progress", updateProgress, false);
  req.addEventListener("load", transferComplete, false);
  req.addEventListener("error", transferFailed, false);
  req.addEventListener("abort", transferCanceled, false);

  req.open('GET', url);

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
    console.log("The transfer is complete.");
  }

  function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
  }

  function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
  }
}

listener()
