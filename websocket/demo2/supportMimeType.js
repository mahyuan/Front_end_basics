const a = [
  'video/webm; codecs="vp8"',
  'video/webm; codecs="vp9"',
  'video/webm; codecs="vp8.0"',
  'video/webm; codecs="vp9.0"',
  'video/webm; codecs="h264"',
  'video/webm; codecs="H264"',
  'video/webm; codecs="avc1"',
  'video/x-matroska; codecs="avc1"',

  'video/ogg; codecs="theora, vorbis"',
  'video/mp4; codecs="avc1.4D401E, mp4a.40.2"',
  'video/webm; codecs="vp8.0, vorbis"',
  'audio/ogg; codecs="vorbis"',
  'audio/mp4; codecs="mp4a.40.5"',
  'video/webm; codecs="vp8，opus"',
  'video/webm; codecs="vp9，opus"',
  'video/webm; codecs="vp8，vp9，opus"',
  'video/webm; codecs="h264，opus"',
  'video/webm; codecs="h264，vp9，opus"'
]
const b = [
  'video/webm',
  'video/x-matroska',
  'video/ogg',
  'video/mp4',
  'audio/ogg',
  'audio/mp4',
]

console.log('MediaRecorder');
a.forEach(item=> {
  let support = MediaRecorder.isTypeSupported(item)
  console.log(`${item}:`, support)
})

console.log('MediaSource');
b.forEach(item=> {
  let support = MediaSource.isTypeSupported(item)
  console.log(`${item}:`, support)
})

// mac Google Chrome 84.0.4147.135
/*
以下支持
video/webm; codecs="vp8"
video/webm; codecs="vp9"
video/webm; codecs="vp8.0"
video/webm; codecs="vp9.0"
video/webm; codecs="h264"
video/webm; codecs="H264"
video/webm; codecs="avc1"
video/x-matroska; codecs="avc1"

// 以下都不支持
video/ogg; codecs="theora, vorbis"
video/mp4; codecs="avc1.4D401E, mp4a.40.2"
video/webm; codecs="vp8.0, vorbis"
audio/ogg; codecs="vorbis"
audio/mp4; codecs="mp4a.40.5"
video/webm; codecs="vp8，opus"
video/webm; codecs="vp9，opus"
video/webm; codecs="vp8，vp9，opus"
video/webm; codecs="h264，opus"
video/webm; codecs="h264，vp9，opus"
*/

