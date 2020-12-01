<template>
  <div class="wrapper">
    <div class="form">
      <label for="url" name="url">url </label>
      <textarea
        class="url-wrap"
        v-model="url"
        name="url"
        rows="2"
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
      url: "https://cdn.hyuan.site/uploads/2_872skUoC/nnGy2Bw.flv",
      plyer: null
    }
  },
  mounted() {
    this.decodeQuery()
    this.initPlayer()
  },
  beforeDestroy() {
    this.destroyPlayer()
  },
  methods: {
    decodeQuery() {
      const query = this.$route.query
      if(query.url) {
        this.url = query.url
      }
    },
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
  text-align: left;
}
.form {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
label {
  display: block;
  font-weight: bold;
  line-height: 1.5;
}
.url-wrap {
  width: 600px;
  margin-bottom: 10px;
}
@media screen and (max-width: 420px){
  .wrapper {
    width: 100%;
  }
  .form {
    width: 100%;
    padding: 10px;
  }
  .url-wrap {
    width: 80%;
  }

}
</style>
