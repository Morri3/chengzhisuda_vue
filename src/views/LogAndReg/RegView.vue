<template>
  <div class="box">
    <div class="line-1">
      <div class="title">手机号码</div>
      <el-input class="input" v-model="user.phone" :maxLength="11" placeholder="请输入手机号码" clearable />
    </div>

    <div class="line-2">
      <div class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码</div>
      <el-input class="input" v-model="user.pwd" type="password" placeholder="请输入密码" show-password clearable/>
    </div>

    <div class="line-3">
      <div class="title">确认密码</div>
      <el-input class="input" v-model="user.pwd2" type="password" placeholder="请输入密码" show-password clearable/>
    </div>

    <div class="line-4">
      <div class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;名</div>
      <el-input class="input" v-model="user.name" placeholder="请输入姓名"/>
    </div>

    <div class="line-5">
      <div class="title">性&nbsp;&nbsp;&nbsp;&nbsp;别</div>
      <el-select class="gender" v-model="user.gender" clearable placeholder="请选择性别">
        <el-option v-for="(item, index) in genderList" :key="index" :label="item" :value="item"/>
      </el-select>
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
      <el-input class="input" v-model="user.jno" :maxLength="6" placeholder="请输入工号"/>
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
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'RegView',
  components: {
    CurTime
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    const store = useStore()

    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        pwd2: '',
        name: '',
        gender: '', // 注册前要把汉字转为对应的数字0或1
        emails: '',
        selectedBirthYear: '',
        selectedBirthMonth: '',
        unit: '',
        jno: ''
      },
      birthYear: [], // 出生年月下拉框
      birthMonth: [], // 出生年月下拉框
      genderList: ['男', '女'], // 性别下拉框
      curTime: { // 时间的样式
        color: 'white'
      }
    })

    onMounted(() => {
      const now = new Date()
      for (let i = now.getFullYear() - 50; i <= now.getFullYear(); i++) {
        state.birthYear.push({
          value: i,
          label: i
        })
      }
      for (let i = 1; i <= 12; i++) {
        state.birthMonth.push({
          value: i,
          label: i
        })
      }
    })

    // 根据日期算年龄
    const getAge = (birthStr) => {
      if (birthStr) {
        const str = birthStr.split('-')
        const date = new Date()

        const today = [date.getFullYear(), date.getMonth() + 1, date.getDate()] // 今天日期
        // 分别计算年月日差值
        const age = today.map((value, index) => {
          return value - str[index]
        })
        // 天数为负数时，月-1，天数+月总天数
        if (age[2] < 0) {
          // 得到上个月总天数
          const lastMonth = new Date(today[0], today[1], 0)
          age[1]--
          age[2] += lastMonth.getDate()
        }
        // 月数为负数时，年-1，月数+12
        if (age[1] < 0) {
          age[0]--
          age[1] += 12
        }
        return age[0]
      }
    }

    // 获取格式化日期
    const getFormatDate = (input) => {
      if (input === '' || !input) {
        return ''
      }
      const date = new Date(input)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      let second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }

    const reg = () => {
      // 验证表单，有一个没填就提示，不让注册
      if (!state.user.phone || !state.user.pwd || !state.user.pwd2 || !state.user.name || !state.user.emails ||
        !state.user.selectedBirthMonth || !state.user.selectedBirthYear || !state.user.unit || !state.user.jno) {
        ElNotification({
          title: '注意啦',
          message: '请填写相关字段',
          type: 'warning',
          position: 'top-right', // 右上
          offset: 60
        })
      } else {
        // 都填了

        if (state.user.phone.length !== 11) {
          // 手机号长度不对
          ElNotification({
            title: '注意啦',
            message: '请输入正确的手机号',
            type: 'warning',
            position: 'top-right', // 右上
            offset: 60
          })
        } else {
          // 手机号长度正确

          // 处理年龄
          let s = ''
          let birthYear = ''
          let birthMonth = ''
          birthYear = state.user.selectedBirthYear // 出生年份
          if (parseInt(state.user.selectedBirthMonth) >= 1 && parseInt(state.user.selectedBirthMonth) <= 9) {
            s = state.user.selectedBirthYear + '-0' + state.user.selectedBirthMonth
            birthMonth = '0' + state.user.selectedBirthMonth
          } else {
            s = state.user.selectedBirthYear + '-' + state.user.selectedBirthMonth
            birthMonth = state.user.selectedBirthMonth
          }
          console.log(s)
          const theAge = getAge(s) // 计算年龄
          console.log('年龄', theAge)

          // 处理性别
          let g = 1
          if (state.user.gender === '男') {
            g = 1
          } else if (state.user.gender === '女') {
            g = 0
          } else {
            g = 1 // 其他情况默认为1
          }
          console.log('性别', g)

          const input = {
            telephone: state.user.phone,
            unit_name: state.user.unit,
            emp_name: state.user.name,
            pwd: state.user.pwd,
            pwd2: state.user.pwd2,
            jno: state.user.jno,
            gender: g,
            emails: state.user.emails,
            age: theAge,
            birth_year: birthYear, // 出生年份
            birth_month: birthMonth, // 出生月份
            reg_date: getFormatDate(new Date()),
            emp_grade: 0 // 0表示兼职发布者
          }
          console.log('输入的注册表单信息', input)

          // 调api
          theAxios.post('http://114.55.239.213:8087/register/emp', input)
            .then(res => {
              console.log('登陆接口的返回数据', res.data.data)

              if (res.data.data.memo === '请输入表单信息') {
                ElNotification({
                  title: '注意啦',
                  message: '请输入表单信息',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '两次密码请输入正确') {
                ElNotification({
                  title: '注意啦',
                  message: '两次密码请输入正确',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '该手机号已注册，请直接登录') {
                ElNotification({
                  title: '注意啦',
                  message: '该手机号已注册，请直接登录',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '请输入正确的邮箱格式') {
                ElNotification({
                  title: '注意啦',
                  message: '请输入正确的邮箱格式',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '注册成功') {
                const thePhone = res.data.data.telephone
                const theUser = {
                  phone: thePhone
                }
                store.commit('setUserLoginInfo', theUser)
                console.log('getUserLoginInfo', store.state.user)

                // 跳转到登录界面
                router.push({
                  path: '/login',
                  query: {
                    userInfo: state.user
                  }
                })

                ElNotification({
                  title: '成功啦',
                  message: '注册成功',
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
    }

    return {
      ...toRefs(state),
      reg,
      getAge,
      getFormatDate
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

    //性别那行特有
    .gender{
      width: 441px;
      height: auto;
      padding: 5px 0px;
      margin-left: 30px;
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
