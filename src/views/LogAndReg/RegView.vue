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
      <div class="title">确认密码</div>
      <el-input class="input" v-model="user.pwd2" type="password" placeholder="请输入密码" show-password/>
    </div>

    <div class="line-4">
      <div class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</div>
      <el-input class="input" v-model="user.name" placeholder="请输入姓名"/>
    </div>

    <div class="line-5">
      <div class="title">性&nbsp;&nbsp;&nbsp;&nbsp;别</div>
      <el-input class="input" v-model="user.gender" placeholder="请输入性别"/>
    </div>

    <div class="line-6">
      <div class="title">邮&nbsp;&nbsp;&nbsp;&nbsp;箱</div>
      <el-input class="input" v-model="user.emails" placeholder="请输入邮箱"/>
    </div>

    <div class="line-7">
      <div class="title">出生年月</div>
      <el-select class="select" v-model="user.selectedBirthYear" clearable placeholder="请选择出生年份">
        <el-option v-for="item in birthYear" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <div class="text">年</div>
      <el-select class="select" v-model="user.selectedBirthMonth" clearable placeholder="请选择出生月份">
        <el-option v-for="item in birthMonth" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <div class="text">月</div>
    </div>

    <div class="line-8">
      <div class="title">所在单位</div>
      <el-input class="input" v-model="user.unit" placeholder="请输入所在单位"/>
    </div>

    <div class="line-9">
      <div class="title">工&nbsp;&nbsp;&nbsp;&nbsp;号</div>
      <el-input class="input" v-model="user.jno" placeholder="请输入工号"/>
    </div>

    <div class="line-10">
      <div class="button" @click="reg()">注册</div>
    </div>

    <CurTime :color="curTime.color" class="time"></CurTime>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CurTime from '@/components/CurTime.vue'

export default {
  name: 'RegView',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    // const phone = ref('')
    // const pwd = ref('')

    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        pwd2: '',
        name: '',
        gender: '',
        emails: '',
        selectedBirthYear: '',
        selectedBirthMonth: '',
        unit: '',
        jno: ''
      },
      birthYear: [], // 出生年月下拉框
      birthMonth: [], // 出生年月下拉框
      curTime: { // 时间的样式
        color: 'white'
      }
    })

    onMounted(() => {
      for (let i = 1980; i <= 2023; i++) {
        state.birthYear.push({
          value: i,
          label: i
        })
      }
      console.log(state.birthYear)
      for (let i = 1; i <= 12; i++) {
        state.birthMonth.push({
          value: i,
          label: i
        })
      }
      console.log(state.birthMonth)
    })

    const reg = () => {
      console.log('reg', '点击了注册按钮')
      console.log('手机号', state.user.phone)
      console.log('密码', state.user.pwd)

      // 调api

      // 跳转
      router.push({ // 跳转到登录界面
        path: '/login',
        query: {
          userInfo: state.user
        }
      })
    }

    return {
      ...toRefs(state),
      reg
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

  .line-1,.line-2,.line-3,.line-4,.line-5,.line-6,.line-8,.line-9,.line-10{
    width: 100%;
    height: 50px;
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
      background: #ffffff;
      border-radius: 5px;
      box-shadow: 1.5px 1.5px 1px #eaeaea;//阴影
    }
  }

  .line-7{
    width: 100%;
    height: 50px;
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
      margin-right: 33px;
      margin-left: 15px;
    }

    .select{
      width:180px;
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .text{
      width: 40px;
      height: auto;
      font-weight: 500;
      font-size: 28px;
      color: #ffffff;
      font-family: zcool-gdh_Regular;
      margin-left: 8px;
    }
  }

  .line-2,.line-3,.line-4,.line-5,.line-6,.line-7,.line-8,.line-9{
    margin-top: 5px;
  }
  .line-10{
    margin-top: 40px;
    margin-bottom: 40px;

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
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    background:none;
  }
}
</style>
