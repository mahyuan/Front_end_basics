<template>
  <div class="wrapper">
    <div class="form">
      <label for="url" name="url">url </label>
      <textarea
        class="url-wrap"
        v-model="url"
        name="url"
        cols="20"
        rows="4"
        @change="handleChange"
        ></textarea>
    </div>
    <div class="player">
      <video
        ref="video"
        width="420"
        height="280"
        muted="false"
        controls
        autoplay
        ></video>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'

export default {
  name: 'Index',
  data() {
    return {
      url: "http://localhost:8000/live/test.flv",
      plyer: null
    }
  },
  mounted() {
    this.initPlayer()
  },
  beforeDestroy() {
    this.destroyPlayer()
  },
  methods: {
    handleChange() {
      this.initPlayer()
    },
    initPlayer() {
      const video = this.$refs.video
      if(video && flvjs.isSupported()) {
        this.player = flvjs.createPlayer({
          type: 'flv',
          url: this.url,
          isLive: true
        })
        this.player.attachMediaElement(video)
        this.player.load()
        this.player.play()
      }
    },
    destroyPlayer() {
      if(this.player && typeof this.player.destroy === 'function') {
        this.player.destroy()
        this.player = null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  margin: 10px;
}
label {
  display: block;
  margin-right: 10px;
}
.url-wrap {
  width: 400px;
}
.player {
  /* border: 1px solid red; */
}
video {

}
</style>
