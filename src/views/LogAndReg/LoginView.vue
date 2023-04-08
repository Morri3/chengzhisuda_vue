<template>
  <div class="box">
    <div class="line-1">
      <div class="title">手机号码</div>
      <el-input class="input" v-model="user.phone" placeholder="请输入手机号码" clearable />
    </div>

    <div class="line-2">
      <div class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码</div>
      <el-input class="input" v-model="user.pwd" type="password" placeholder="请输入密码" show-password/>
    </div>

    <div class="line-3">
      <div class="button" @click="login()">开启兼职之旅</div>
    </div>

    <CurTime class="time" :color="curTime.color"></CurTime>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import CurTime from '@/components/CurTime.vue'
import router from '@/router'

export default {
  name: 'LoginView',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    // const router = useRouter() // 使用路由

    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        token: ''
      },
      curTime: { // 时间的样式
        color: 'white'
      }
    })

    onMounted(() => {
    })

    const login = () => {
      console.log('login', '点击了登录按钮')
      console.log('手机号', state.user.phone)
      console.log('密码', state.user.pwd)

      // 调api

      // 跳转到首页
      router.push({
        path: '/home',
        query: {
          account: state.user.phone, // 将用户的账号传过去
          token: state.user.token
        }
      })
    }

    return {
      ...toRefs(state),
      login
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
  background-image: url('/public/img/logandreg/背景（橙紫）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .line-1,.line-2,.line-3{
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .title{
      width: 115px;
      height: auto;
      font-weight: 500;
      font-size: 28px;
      color: #ffffff;
      font-family: zcool-gdh_Regular;
    }
    .input{
      width: 441px;
      height: 40px;
      margin-left: 30px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 1.5px 1.5px 1px #eaeaea;//阴影
    }
  }

  .line-2{
    margin-top: 20px;
  }
  .line-3{
    margin-top: 40px;

    .button{
      width: 551px;
      height: 50px;
      background: #CC77FF;
      text-align: center;
      border-radius: 30px;
      box-shadow: 4px 4px 2px #000000;//阴影

      font-weight: 500;
      font-size: 30px;
      color: #ffffff;
      font-family: zcool-gdh_Regular;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer; // 小手样式
    }
  }

  .time{
    width: auto;
    height: auto;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    background:none;
  }
}
</style>
