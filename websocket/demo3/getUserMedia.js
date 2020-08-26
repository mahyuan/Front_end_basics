/**
 * https://zhuanlan.zhihu.com/p/25162723
 */
const MediaUtils = {
  /**
   * 获取用户媒体设备(处理兼容的问题)
   * @param videoEnable {boolean} - 是否启用摄像头
   * @param audioEnable {boolean} - 是否启用麦克风
   * @param callback {Function} - 处理回调
   */
  getUserMedia: function(videoEnable, audioEnable, callback) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            || navigator.msGetUserMedia || window.getUserMedia;

    const constraints = { video: videoEnable, audio: audioEnable }
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          callback(false, stream)
        }).catch(e => {
          callback(e)
        })
    } else {
      callback(new Error('Not support userMedia'))
    }
  },
   /**
     * 关闭媒体流
     * @param stream {MediaStream} - 需要关闭的流
     */
    closeStrean: function(stream) {
      if(typeof stream.stop === 'function') {
        stream.stop()
      } else {
        let trackList = [stream.getAudioTracks(), stream.getVideoTracks()]

        for(let i = 0; i < trackList.length; i++) {
          let tracks = trackList[i]
          if(tracks && tracks.length > 0) {
            for(let j = 0; j < tracks.length; j++) {
              let track = tracks[j]
              if(typeof track.stop === 'function') {
                track.stop()
              }
            }
          }
        }
      }
    }
}

// 用于存放 MediaRecorder 对象和音频Track，关闭录制和关闭媒体设备需要用到
let recorder, mediaStream;

// 用于存放录制后的音频文件对象和录制结束回调
let recorderFiel, stopRecordCallback;

// 用于存放是否开启了视频录制
var videoEnabled = false;

// 录制短语音
function startRecord(enableVideo) {
  videoEnabled = enableVideo
  MediaUtils.getUserMedia(enableVideo, true, (err, stream) => {
    if(err) {
      throw err
    } else {
      // 通过 MediaRecorder API记录获取到的流媒体
      recorder = new MediaRecorder(stream)
      mediaStream = stream
      var chunks = [], startTime = 0;
      recorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      recorder.onstop = (event) => {
        recorderFiel = new Blob(chunks, { type: recorder.mimeType })
        chunks = []
        if(stopRecordCallback !== null) {
          stopRecordCallback()
        }
        recorder.start()
      }
    }
  })
}

// 停止录音
function stopRecord(callback) {
  stopRecordCallback  = callback
  recorder.stop
  MediaUtils.closeStrean(mediaStream)
}

function playRecorder() {
  const url = URL.createObjectURL(recorderFiel)
  const dom = document.createElement(videoEnabled ? 'video' : 'audio')
  dom.autoplay = true
  dom.src = url
  // 视频设置样式
  if(videoEnabled) {
    dom.width = 640
    dom.height = 480
    dom.style.zIndex = '9999999';
    dom.style.position = 'fixed';
    dom.style.left = '0';
    dom.style.right = '0';
    dom.style.top = '0';
    dom.style.bottom = '0';
    dom.style.margin = 'auto';
    document.body.appendChild(dom)
  }
}


// 启动录制视频 (若需要录制音频参数指定为 false 即可)
startRecord(true);
// 5秒后结束录制并播放
setTimeout(function(){
    // 结束
    stopRecord(function() {
        // 播放
        playRecord();
    });
}, 5000);


var data = new FormData();

data.append("username", "test");
data.append("userfile", recorderFile);

var req = new XMLHttpRequest();
req.open("POST", "http://xxx/xxx");
req.send(data);
