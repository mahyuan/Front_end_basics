<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <div class="btn">
      <button @click="handleClickRun">reset</button>
      <button @click="handleClickAsk">Add Num</button>
      <button @click="handleClickPost">Post</button>
    </div>
    <div class="content">
      <div v-for="item in values" :key="item.num" class="item">
        <span class="label">{{ item.num }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getFactorial } from '../utils/worker'
/**
 * vue-worker有两个主要API
 * .run(fun, [...args]) ： fun是要在另一个线程执行的函数，第二个参数是一个数组，里面的内容使用postMessage传递的参数
 *              run方法是一次性的，执行完之后worker线程会被关掉，要持久化运行worker，可以使用 create来创建
 * .create([...actions]) ： 创建一个worker对象（而不是worker实例，通过该对象提供了几个属性接口）
 *              actions是一个数组，数组的每个元素包含两个属性对象，message 是postMessage的id,
 *                func是要传递的方法
 */

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      values: [],
      message: 'This is web worker!',
      defaultNum: 1,
      num: 1,
      worker: null
    }
  },
  created() {
    this.createWorker()
  },
  destroyed() {
    this.worker = null
  },
  methods: {
    handleClickPost() {
      let randomNum = () => Math.floor(Math.random() * 100)
      const data = Array.from(new Array(10), () => randomNum())
      this.worker.postMessage('pull-data', [data])
      .then(res => {
        console.log('res', res);
        this.message = res
      }).catch(e => {
        console.error(e);
      })
    },
    createWorker() {
      this.num = this.defaultNum
      this.worker = this.$worker.create([
        {
          message: 'pull-data',
          func: (data) => {
            if(Array.isArray(data)) {
              return data.join('-')
            }
            return data
          }
        },
        {
          message: 'run-task',
          func: (id) => {
            console.log('run-task', id)
          }
        }
      ])
    },
    handleClickRun() {
      this.values = []
      this.worker1 = this.$worker.run(getFactorial, [this.defaultNum])
        .then(res => {
          this.values.push({num: this.defaultNum, value: res})
        }).catch(e => {
          console.error('catch', e);
        })
    },
    handleClickAsk() {
      this.num = this.num + 1
      this.worker1 = this.$worker.run(getFactorial, [this.num])
        .then(res => {
          this.values.push({num: this.num, value: res})
        }).catch(e => {
          console.error(e);
        })
    },
  }
}
</script>
<style scoped>
.content {
  display: flex;
  width: 1000px;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px auto;
}
.item {
  display: flex;
  height: 18px;
}
.label {
  display: inline-block;
  width: 200px;
  height: 100%;
  border-right: 1px solid green;
  text-align: right;
  padding-right: 10px;
}
.value {
  display: inline-block;
  margin-left: 10px;
}
.btn {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 100px;
}
button {
  width: fit-content;
  height: 25px;
  margin: 5px;
  padding: 0 10px;
  background: rgb(126, 153, 126);
  border: 1px solid rgb(202, 228, 202);
  border-radius: 3px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
