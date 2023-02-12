<template>
  <div>
    <!--导航栏-->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <!--路由-->
    <router-view/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import { reactive, toRefs, computed } from 'vue'
// import { useRoute } from 'vue-router'
export default {
  components: {
  },
  props: {
  },
  emits: [
  ],

  setup () {
    const state = reactive({
    })

    return {
      ...toRefs(state)
      // routes
    }
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="less">
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
