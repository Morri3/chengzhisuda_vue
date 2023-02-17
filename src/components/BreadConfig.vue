<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item> -->
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
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
      name: '', // 路由名称
      children: null // json对象
    })

    onMounted(() => {
      // console.log(route)
      // console.log(route.matched)
      // console.log(route.matched[1])
      // state.lists = route.matched // 获取路由内的全部信息
    })

    watch( // 监控路由变化
      () => route.fullPath,
      (newValue, oldValue) => {
        // state.lists = newValue
        const obj = (route.matched)[0] // json对象
        for (var key in obj) { // 遍历每个属性key
          if (key === 'children') { // 找到children这个属性的值
            state.children = obj[key] // obj[key]是数组
            for (var i = 0; i < obj[key].length; i++) { // (obj[key])[i]都是一个对象
              if ((obj[key])[i].path === newValue) { // 找到当前路由
                state.name = (obj[key])[i].meta.title // 当前路由的meta的title赋值给name，显示在面包屑中
              }
            }
          }
        }
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
}
</style>
