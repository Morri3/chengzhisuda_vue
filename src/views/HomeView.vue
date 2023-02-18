<template>
  <div class="home">
    <div @click="handleClick()">123</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
// import { useRoute } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup () {
    // const route = useRoute() // 使用路由
    const state = reactive({

    })

    onMounted(() => {
      // console.log(route.matched) // 获取当前匹配的路由，包括首页(重定向)+当前页
    })

    const handleClick = () => {
      // console.log(route.matched) // 获取当前匹配的路由，包括首页(重定向)+当前页
    }

    return {
      ...toRefs(state),
      handleClick
    }
  }

}
</script>
