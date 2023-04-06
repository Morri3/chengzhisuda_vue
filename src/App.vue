<template>
  <!--导航栏-->
  <!-- <nav>
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
    <router-link to='/user'>用户</router-link>
    <router-link to='/user/signup'>报名</router-link>
  </nav> -->
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
            <el-dropdown-item @click="reg()">注册</el-dropdown-item>
            <el-dropdown-item @click="cancel()">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="drop-"></div>
  </div>
  <!--登录页-->
  <div class="outer-box">
    <LoginView></LoginView>
  </div>
  <!--面包屑组件-->
  <BreadConfig></BreadConfig>
  <!--路由-->
  <!-- <router-view /> -->
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import BreadConfig from '@/components/BreadConfig.vue'
import LoginView from '@/views/LogAndReg/LoginView.vue'

export default {
  components: {
    BreadConfig, LoginView
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

    const login = () => {
      console.log('登录', '跳转进行登录')
    }

    const reg = () => {
      console.log('注册', '跳转进行注册')
    }

    const cancel = () => {
      console.log('登出', '跳转进行登出')
    }

    return {
      ...toRefs(state),
      login,
      reg,
      cancel
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
