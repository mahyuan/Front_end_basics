/**
 * 获取摄像头
 * navigator.getUserMedia 已在web标准中移除
 * navigator.mediaDevices.getUserMedia 推荐使用
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/getUserMedia
 * https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
 */

const constraints = {
  audio: true,
  // video: true
  // video: {
  //   width: { min: 1024, ideal: 1280, max: 1920 },
  //   height: { min: 776, ideal: 720, max: 1080 }
  // }
  video: { width: 1280, height: 720 }
}

function getUserMedia() {
  return navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      console.log('stream', stream);
      if ("srcObject" in v) {
        v.srcObject = stream;
      } else {
        v.src = window.URL.createObjectURL(stream);
      }
      v.onloadedmetadata = function (e) {
          v.play();
      };

    }).catch(e => {
      console.error('获取摄像头失败', e);
    })
}
getUserMedia()
