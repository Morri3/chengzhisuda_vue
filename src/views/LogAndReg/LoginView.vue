<template>
  <div class="box">
    <div class="line-1">
      <div class="title">手机号码</div>
      <el-input class="input" v-model="user.phone" :maxlength="11" placeholder="请输入手机号码" clearable />
    </div>

    <div class="line-2">
      <div class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码</div>
      <el-input class="input" v-model="user.pwd" type="password" placeholder="请输入密码" clearable show-password/>
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
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'LoginView',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    // const router = useRouter() // 使用路由
    const store = useStore()

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

      if (!state.user.phone || !state.user.pwd) {
        // 没输入不调api
        ElNotification({
          title: '出错啦',
          message: '请检查是否有输入',
          type: 'error',
          position: 'top-right', // 右上
          offset: 60
        })
      } else {
        // 有输入再调api
        const user = {
          telephone: state.user.phone,
          pwd: state.user.pwd
        }
        console.log('输入的账号密码', user)

        theAxios.post('http://114.55.239.213:8087/login/emp', user)
          .then(res => {
            console.log('登陆接口的返回数据', res.data.data)

            if (res.data.data.memo === '不存在该兼职发布者') {
              ElNotification({
                title: '出错啦',
                message: '不存在该兼职发布者',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (res.data.data.memo === '密码或账号错误，请检查后重新输入') {
              ElNotification({
                title: '出错啦',
                message: '密码或账号错误，请检查后重新输入',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (res.data.data.memo === '登录成功') {
              // 处理性别
              let theGender = ''
              if (res.data.data.gender === 1) {
                theGender = '男'
              } else {
                theGender = '女'
              }

              // 将token赋值给state.user，并存到store中
              const theUser = {
                token: res.data.data.token,
                isLogin: true,
                username: res.data.data.emp_name,
                phone: res.data.data.telephone,
                pwd: res.data.data.pwd,
                head: res.data.data.head, // 头像
                gender: theGender,
                isAdmin: res.data.data.emp_grade // 是否是管理员，1是，0不是
              }
              store.commit('setUserLoginInfo', theUser)
              console.log('用户登录信息', store.state.user)

              // 跳转到首页
              router.push({
                path: '/home'
                // query: {
                //   phone: theUser.phone, // 将用户的账号传过去
                //   pwd: theUser.pwd,
                //   token: theUser.token,
                //   isLogin: theUser.isLogin,
                //   username: theUser.username,
                //   isAdmin: theUser.isAdmin // 是否是管理员
                // }
              })

              ElNotification({
                title: '成功啦',
                message: '登录成功',
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
