/**
 * 获取摄像头
 * navigator.getUserMedia 已在web标准中移除
 * navigator.mediaDevices.getUserMedia 推荐使用
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/getUserMedia
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
 */

let videoPlaying = false;
let v =  null // document.getElementById('v');
var front = false;
document.getElementById('flip-button').onclick = function() {
  front = !front;
  initUserMedia()
};

var constraints = { video: { facingMode: (front? "user" : "environment") } };

function initUserMedia() {
  if(typeof navigator.mediaDevices === 'undefined') {
    navigator.mediaDevices = {}
  }
  if(typeof navigator.mediaDevices.getUserMedia === 'undefined') {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if(!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      })

    }
  }

// 用于存放 MediaRecorder 对象和音频Track，关闭录制和关闭媒体设备需要用到
var recorder, mediaStream;

// 用于存放录制后的音频文件对象和录制结束回调
var recorderFile, stopRecordCallback;

// 用于存放是否开启了视频录制
var videoEnabled = false;


  let promise = navigator.mediaDevices.getUserMedia(constraints)
  promise.then(stream => {
    console.log('stream', stream);
    v = document.getElementById('v')
    if ("srcObject" in v) {
      v.srcObject = stream;
    } else {
      v.src = window.URL.createObjectURL(stream);
    }
    v.onloadedmetadata = function (e) {
        v.play();
        videoPlaying = true
    };


    // 通过 MediaRecorder 记录获取到的媒体流
    recorder = new MediaRecorder(stream);
    mediaStream = stream;
    console.log('recorder', recorder);

    var chunks = [], startTime = 0;
    recorder.ondataavailable = function(e) {
      console.log('ondataavailable', e.data);
      chunks.push(e.data);
    };

    recorder.onstop = function (e) {
      console.log('onstop called');
        recorderFile = new Blob(chunks, { 'type' : recorder.mimeType });
        chunks = [];
        console.log('recorderFile', recorderFile);

        downloadByBlob(recorderFile)
    };
    recorder.start(1000);
  }).catch(e => {
    console.error('获取摄像头失败', e);
  })

  const button = document.getElementById('stop')
  button.onclick = (e) => {
    const state =  recorder.state
    console.log('recorder.state', state); // 闲置中,录制中或者暂停 :inactive, recording, or paused
    if(state === 'recording') {
      recorder.stop()
      button.innerText = 'start'
    } else if(state === 'inactive') {
      recorder.start(1000)
    } else if(state === 'paused') {
      recorder.resume()

    }
  }

}
initUserMedia()

function takePhotoListener() {
  const button = document.getElementById('takePhoto')
  button.onclick = () => {
    const canvas = document.querySelector('#canvas')
    canvas.width = v.videoWidth
    if(videoPlaying) {
      canvas.width = v.videoWidth
      canvas.height = v.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(v, 0, 0)
      let data = canvas.toDataURL('image/png')
      console.log('data', data);
      document.getElementById('photo').setAttribute('src', data)
    }
  }
}
takePhotoListener()

// 通过blob对象下载
function downloadByBlob(blobObj) {
  const link = document.createElement('a');
  link.style.display = 'none';
  const downloadUrl = window.URL.createObjectURL(blobObj);
  link.href = downloadUrl;
  link.download = `test.webm`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
