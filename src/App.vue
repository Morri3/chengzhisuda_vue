<template>
  <div>
    <!--顶部状态栏-->
    <div class="top-box">
      <div class="title" @click="refresh()">城职速达</div>
      <div class="log-box">
        <img class="icon" v-if="user.gender === '男'" :src="user.head !== '0' ? user.head : '/img/userhome/head1.png'" alt=""/>
        <img class="icon" v-else-if="user.gender === '女'" :src="user.head !== '0' ? user.head : '/img/userhome/head2.png'" alt=""/>
        <img class="icon" v-else src="/img/userhome/icon_head1.jpeg" alt=""/>

        <el-dropdown class="hover">
          <span class="username">{{user.username ? user.username : '未登录'}}</span>
          <template #dropdown>
            <el-dropdown-menu class="menu">
              <el-dropdown-item @click="login()" v-if="user.isLogin === false || user.isLogin === undefined" class="btn">
                登录
              </el-dropdown-item>
              <el-dropdown-item @click="reg()" v-if="user.isLogin === false || user.isLogin === undefined" class="btn">
                注册
              </el-dropdown-item>
              <el-dropdown-item @click="cancel()" v-if="user.isLogin === true && user !== null && user !== undefined" class="btn">
                登出
              </el-dropdown-item>
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
import { reactive, toRefs, onMounted, computed, onBeforeMount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BreadConfig from '@/components/BreadConfig.vue'
import { useStore } from 'vuex'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'

export default {
  components: {
    BreadConfig
  },
  props: {},
  emits: [],

  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由
    const store = useStore()

    const state = reactive({
    })

    // 是否显示面包屑
    const routes = computed(() => {
      let res = null
      if (route.path === '/home' || route.path === '/login' || route.path === '/reg') {
        // 不显示
        res = false
      } else {
        // 其余页面显示
        res = true
      }
      return res
    })

    watch(
    )

    onBeforeMount(() => {
      console.log(user.value)
      console.log(user.value.isLogin)
    })

    // 从store中获取用户信息，计算属性实现store中的user变化后，这里就能响应到，从而改变状态
    const user = computed(() => {
      const u = store.state.user
      return u
    })

    onMounted(() => {
    })

    const login = () => {
      router.push({
        path: '/login' // 跳转到登录界面
      })
    }

    const reg = () => {
      router.push({
        path: '/reg' // 跳转到注册界面
      })
    }

    // 登出
    const cancel = () => {
      // 调api
      theAxios.post('http://114.55.239.213:8087/logout/emp', {
        input_telephone: store.state.user.phone
      })
        .then(res => {
          console.log('登出接口的返回数据', res.data.data)

          if (res.data.data === '用户登出失败') {
            ElNotification({
              title: '出错啦',
              message: '用户登出失败',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data === '用户登出成功') {
            // 更新isLogin，并存到store中
            const theUser = {
              phone: '',
              token: '',
              username: '',
              pwd: '',
              isLogin: false
            }
            store.commit('setUserLoginInfo', theUser)
            console.log('getUserLoginInfo', store.state.user)

            // 跳转到首页
            router.push({
              path: '/'
            })

            ElNotification({
              title: '成功啦',
              message: '用户登出成功',
              type: 'success',
              position: 'top-right', // 右上
              offset: 60
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const refresh = () => {
    }

    return {
      ...toRefs(state),
      login,
      reg,
      cancel,
      refresh,
      routes,
      user
    }
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
    color: #ffe7ab;
    box-shadow: 3px 3px 1px #c7bdad;//阴影
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

      .username{
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
