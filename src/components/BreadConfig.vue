<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="breadcrumb-item" :to="{ path: item.path }" v-for="(item, index) in list" :key="index">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BreadConfig',
  setup () {
    const route = useRoute() // 使用路由

    const state = reactive({
      list: [] // 路由数组
    })

    onMounted(() => {
      // console.log(state.list)
    })

    watch( // 监控路由变化
      () => route.path, // 也可以写route
      () => {
        state.list = route.matched.filter(
          (item) => item.meta && item.meta.title
        )
        console.log(state.list)
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
  width:auto;
  height:auto;
  position:fixed;
  top: 10px;
  left: 10px;

  .breadcrumb-item{
    font-family: 'DingTalk_JinBuTi_Regular';
    font-size: 16px;
  }
}
</style>
