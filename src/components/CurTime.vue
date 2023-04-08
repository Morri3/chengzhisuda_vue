<template>
  <div class="box">
    <div class="time" :style="'color:' + color +';'">{{format(curTime)}}</div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'CurTime',
  props: {
    color: String
  },
  components: {},
  emits: [],

  setup () {
    const state = reactive({
      timer: '', // 定时器
      curTime: new Date() // 当前时间
    })

    onMounted(() => {
      state.timer = setInterval(() => {
        state.curTime = new Date()
      }, 1000)
    })

    const format = (time) => {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      const dayOnWeekend = '日一二三四五六'.charAt(time.getDay())
      return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' +
        seconds + ' 星期' + dayOnWeekend + '，欢迎您！'
    }

    onBeforeUnmount(() => {
      // Vue实例销毁前，清除定时器
      if (state.timer) {
        clearInterval(state.timer)
      }
    })

    return {
      ...toRefs(state),
      format
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: none;

  .time{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: DingTalk_JinBuTi_Regular;
  }
}
</style>
