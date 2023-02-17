<template>
  <!--导航栏-->
  <nav>
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-link to='/user'>用户</router-link>
  </nav>
  <!--面包屑组件-->
  <BreadConfig></BreadConfig>
  <!--路由-->
  <router-view />
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import BreadConfig from '@/components/BreadConfig.vue'

export default {
  components: {
    BreadConfig
  },
  props: {},
  emits: [],

  setup () {
    // const route = useRoute() // 使用路由
    const state = reactive({

    })

    onMounted(() => {
      // console.log(route.matched)
    })

    return {
      ...toRefs(state)
    }
  },

  data () {
    return {}
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
