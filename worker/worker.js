
onmessage =  function (e) {
  // console.log('workder onmessage', e)

  // postMessage('please write you question!')

  if(e.data == 'ask') {
    postMessage({message: '今天天气真好啊！', color: 'red', fontsize: '30px', type: 'ask'})
  } else {
    postMessage({message: 'hello worker', color: 'blue', fontsize: '10px', type: 'send'})
  }
}
