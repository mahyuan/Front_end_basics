
function fn(num) {
    this.num = num
    let _this = this
    let timer = setInterval(() => {
        if (_this.num >= 200) clearInterval(timer)

        _this.num += 50
        console.log(_this.num)
    }, 300)
}

let promise = new Promise((resolve, reject) => {
    resolve()
})

promise
    .then(() => {
        console.log('first')
        fn(10)
    })
    .then(() => {
        console.log('second');
    })
    .catch((error) => {
        throw console.error();
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
    }).then((k) => {
        k++;
        console.log(k)
    }).catch( (l)=> {
        // throw console.error();
        console.log(l++)
    })
}, 300);

 

function fn(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(resolve, time, 'done')
        }, time);
    })
}
fn(300).then((value) => {
    console.log('====>', value)
})



new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});





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
loadImag(url)


const getJSON = function (url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function() {
      if(this.readyState !==4) return;
      
      if(this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open();
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })

  return promise
}

getJSON('/posts.json').then(function(json) {
  console.log('Contents:' + json)
}, function(error){
  console.log('erroe:', error)
})











