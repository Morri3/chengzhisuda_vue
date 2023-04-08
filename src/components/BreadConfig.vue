<template>
  <div class="breadcrumb">
    <img class="icon" :src="require('../../public/img/utils/icon_right.png')" alt=""/>
    <el-breadcrumb separator="-">
      <el-breadcrumb-item class="breadcrumb-item" :to="{ path: item.path }" v-for="(item, index) in list" :key="index">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <CurTime :color="curTime.color" class="time"></CurTime>
  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CurTime from '@/components/CurTime.vue'

export default {
  name: 'BreadConfig',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    const route = useRoute() // 使用路由

    const state = reactive({
      list: [], // 路由数组
      curTime: { // 时间的样式
        color: '#333333'
      }
    })

    onMounted(() => {
      // console.log(state.list)
    })

    watch( // 监控路由变化
      () => route.path, // 或写route
      () => {
        state.list = route.matched.filter(
          (item) => item.meta && item.meta.title
        )
        console.log('state.list', state.list)
      }, { immediate: true }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb{
  width:100%;
  height:54px;
  position:fixed;
  top: 54px;
  right:0px;
  left: 0px;
  background: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center; // 垂直居中

  .icon{
    width: 20px;
    height:20px;
    margin-left: 30px;
  }

  .breadcrumb-item{
    font-family: 'DingTalk_JinBuTi_Regular';
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer; // 小手的样式
  }

  .time{
    width: auto;
    height: auto;
    position: absolute;
    right: 20px;
    background:none;

    font-weight: 400;
    font-size: 15px;
    font-family: zcool-gdh_Regular;
  }
}
</style>
