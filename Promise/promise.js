var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function fn1(num) {
    this.num = num

    let timer = setInterval(() => {
        if (this.num >= 200) clearInterval(timer)

        this.num += 50
        console.log('num:',this.num)
    }, 300)
}

let promise = new Promise((resolve, reject) => {
    resolve()
})

promise
    .then(() => {
        console.log('first')
        fn1(10)
    })
    .then(() => {
        console.log('second');
    })
    .catch((error) => {
        throw console.error(e);
    })
// first
// second
// 60
// 110
// 160
// 210
// 260




setTimeout( () => {
    return new Promise((resolve, reject) => {
        let k = 0, l = 0;
        resolve(k)
        // reject(l)
    }).then((v) => {
        v++;
        console.log('current k',v)
    }).catch((l)=> {
        // throw console.error();
        l++
        console.log('reject l', l)
    })
}, 300);



function fn2(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(time, 'done')
            resolve(time)
        }, time);
    })
}
fn2(300).then((value) => {
    console.log('====>', value)
})



// new Promise((resolve, reject) => {
//   resolve(1);
// }).then(r => {
//   console.log('resolve:',r);
// });





function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
// loadImageAsync()


function loadImag(url) {
    return new Promise((resolve, reject) => {
        const image = new Image(); // 浏览器原生的构造函数，生成一个 <img> 标签

        // const image = document.createElement('img')
        image.onload = function () {
            resolve(image)
        }
        image.onerror = function () {
            reject(new Error('error'))
        }
        image.src = url
    })
}
let url = 'https://wicdn.xiaohongchun.com/xhc-plat/1487769370994_MGtrkdcSfW.jpg-big2x.jpg'
// loadImag(url)

function myAsyncFunction(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        console.log('====evnet=====', event);
        var percentComplete = event.loaded / event.total * 100;
        // ...
      } else {
        // 总大小未知时不能计算进程信息
      }
    }

    // 监听事件
    /*
    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load" , transferComplete);
    xhr.addEventListener("error", transferFailed  );
    xhr.addEventListener("abort", transferCanceled);
    */
    // xhr.addEventListener("load", reqListener); // 等价于 onload,
    //  load事件触发于传输完成
    // progress事件触发于检索的数据量发生变化，

    xhr.onload = () => {
      console.log('---------xhr----------\n', xhr.getAllResponseHeaders());
      console.log('---------xhr----------\n', xhr.getRequestHeader('content-type'));

      console.log('---------xhr----end------\n');
      resolve(xhr.responseText)
    };
    // xhr.addEventListener("progress", updateProgress);
    // progress 事件一般用于文件下载
    xhr.onerror = () => reject(xhr.statusText);

    xhr.open(method, url);
    xhr.setRequestHeader('content-type','application/json; charset=utf-8')

    xhr.send();
  });
};


myAsyncFunction('GET', 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=false')
  .then(res => {
    console.log('myAsyncFunction', res);
  })
  .catch(e => {
    console.log('myAsyncFunction reject', e);
  })


const getResponse = function (method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange =  function() {
      if(this.readyState !==4) return;

      if(this.status === 200) {
        resolve(this.responseText)
      } else {
        reject(new Error(this.statusText))
      }
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type','application/json; charset=utf-8')
    xhr.send()
  })

  return promise
}

function callXHR(method, url) {
  getResponse(method, url)
    .then((res) => {
      console.log('Contents:', res)
    }).catch(e => {
      console.error(e);
    })
}

// callXHR('GET', 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=false')

let proms = Promise.all([
  callXHR('GET', 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=true'),
  callXHR('GET', 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=false')
]).then(res => {
  console.log('all', res);
})


Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))


const p2 = Promise.reject('出错了');
// 等同于
const p3 = new Promise((resolve, reject) => reject('出错了'))

