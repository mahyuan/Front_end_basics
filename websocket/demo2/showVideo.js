(function() {
  var v = document.getElementById('v')
  var buffer, queue = []

  if ('MediaSource' in window && MediaSource.isTypeSupported(mimeType)) {
    var mediaSource = new MediaSource();
    console.log(mediaSource.readyState); // closed
    console.log('mediaSource', mediaSource);
    // if('srcObject' in v) {
    //   v.srcObject = mediaSource
    // } else {
    // }
    v.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', function(e) {
      console.log('sourceopen event called, state:', mediaSource.readyState);
console.log('1');
      buffer = mediaSource.addSourceBuffer(mimeType);

      buffer.addEventListener('updatestart', function(e) { console.log('updatestart: ' + mediaSource.readyState); });
      buffer.addEventListener('update', function(e) { console.log('update: ' + mediaSource.readyState); });
      buffer.addEventListener('updateend', function(e) { console.log('updateend: ' + mediaSource.readyState); });
      buffer.addEventListener('error', function(e) { console.log('error: ' + mediaSource.readyState); });
      buffer.addEventListener('abort', function(e) { console.log('abort: ' + mediaSource.readyState); });

      // let buf = queue.shift()
      // console.log('queue.shift()', buf);

      // buffer.appendBuffer(buf);

      buffer.addEventListener('updateend', function() {
        console.log('---buffer updateend called--:', mediaSource.readyState);
        mediaSource.endOfStream()
        v.play()
      })
      if(queue.length > 0 && !buffer.updating) {
        buffer.appendBuffer(queue.shift())
        console.log('update listener');
      }
    });
  } else {
    console.error('Unsupported MIME type or codec: ', mimeType);
  }


  ws.onopen = () => {
    console.log('on open');
  }

  ws.onmessage = (event) => {
    const data = event.data
    console.log('data', data);
    let type = Object.prototype.toString.call(data)
    if(type === '[object ArrayBuffer]') {
      if(!buffer.updating) {
        buffer.appendBuffer(data)
      } else {
        queue.push(data)
      }
    }
  }
})();
