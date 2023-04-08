<template>
  <div>
    <!--顶部状态栏-->
    <div class="top-box">
      <div class="title">城职速达</div>
      <div class="log-box">
        <img class="icon" src="" alt=""/>

        <el-dropdown class="hover">
          <span class="status">未登录</span>
          <template #dropdown>
            <el-dropdown-menu class="menu">
              <el-dropdown-item @click="login()" class="btn">登录</el-dropdown-item>
              <el-dropdown-item @click="reg()" class="btn">注册</el-dropdown-item>
              <el-dropdown-item @click="cancel()" v-if="isLogin === true" class="btn">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!--正文部分路由-->
    <div class="outer-box">
      <router-view></router-view>
    </div>

    <!--面包屑组件-->
    <BreadConfig v-show="routes"/>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BreadConfig from '@/components/BreadConfig.vue'

export default {
  components: {
    BreadConfig
  },
  props: {},
  emits: [],

  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由
    const state = reactive({
      isLogin: true
    })

    // const key = computed(() => {
    //   return route.path + Math.random()
    // })

    // 是否显示面包屑
    const routes = computed(() => {
      let res = null
      if (route.path === '/home' || route.path === '/login' || route.path === '/reg') {
        // 不显示
        res = false
      } else {
        res = true
      }
      return res
    })

    onMounted(() => {
      // console.log(route.matched)
    })

    const login = () => {
      console.log('登录', '跳转进行登录')
      router.push({ // 跳转到登录界面
        path: '/login'
      })
    }

    const reg = () => {
      console.log('注册', '跳转进行注册')
      router.push({ // 跳转到注册界面
        path: '/reg'
      })
    }

    const cancel = () => {
      console.log('登出', '跳转进行登出')
      // 调api
    }

    return {
      ...toRefs(state),
      login,
      reg,
      cancel,
      routes
      // ,
      // key
    }
  },

  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.top-box{
  width:100%;
  height:54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  background: #d1b3f8;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99999;//置于最顶层

  .title{
    width: auto;
    height: auto;
    position: relative;//相对布局
    margin-right: 583px;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    font-family: Alimama_ShuHeiTi_Bold;
  }
  .log-box{
    width: 95px;
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;//相对布局
    margin-right: 50px;

    .icon{
      width: 35px;
      height: 35px;
    }
    .hover{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-left: 5px;
      padding-top: 23px;

      .status{
        width: auto;
        height: auto;
        font-size: 14px;
        font-weight: 300;
        color: #000000;
        font-family: Alimama_ShuHeiTi_Bold;
        text-align: center;
      }
      .menu{
        margin-top: 20px;
        //这里是错的，要改
        ::v-deep .el-dropdown-menu__item:focus,::v-deep .el-dropdown-menu__item:not(.is-disabled) {
          &:hover {
            border: none !important;
            background-color: #fff !important;
            color: #13d1be;
          }
        }
      }
    }
  }
}

.outer-box{
  width: 100%;
  height:calc( 100% - 54px );
  position: absolute;
  top: 54px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btn{
  cursor: pointer; // 小手的样式
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
