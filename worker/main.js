window.onload = function(e) {
  if(window.Worker) {
    const myWorker = new Worker('./worker.js')

    // console.log('onload myWorker', myWorker);
    const ask = document.querySelector('#ask')
    const send = document.querySelector('#send')
    const textEl = document.querySelector('.text')
    console.log('textEl', textEl);
    ask.onclick = function(e) {
      console.log('ask click');
      myWorker.postMessage('ask')
      myWorker.onmessage = function(e) {
        // console.log('ask onmessage', e.data);
        changeEl(e.data)
      }
    }

    send.onclick = function (e) {
      console.log('send click');
      myWorker.postMessage('send')
      myWorker.onmessage = function(e) {
        // console.log('send onmessage', e.data);
        changeEl(e.data)
      }
    }
    function changeEl(data) {
      textEl.innerText = data.message
      textEl.style.color = data.color
      textEl.style.fontSize = data.fontsize
    }
  }
}
