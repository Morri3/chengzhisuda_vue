<template>
  <div class="box">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">个人信息修改</div>
      </div>

      <!--主体部分-->
      <div class="main-box">
        <!--左边部分-->
        <div class="left-box">
          <!--头像部分-->
          <div class="head-box">
            <img class="head" :src="user.head" alt=""/>
            <div class="text-box">
              <div class="top">
                <div class="username">{{ user.username }}</div>
              </div>
              <div class="bottom">
                <el-tag class="gender" type="primary">{{user.gender}}</el-tag>
                <el-tag class="age" type="success">{{user.age}}岁</el-tag>
                <el-tag class="admin" type="warning" v-if="user.isAdmin === 1">管理员</el-tag>
              </div>
            </div>
          </div>
        </div>

        <!--右边部分-->
        <div class="right-box">
          <div class="title">身份信息</div>
          <div class="info-box">

            <div class="line-1">
              <div class="gender-text">性&nbsp;&nbsp;&nbsp;&nbsp;别</div>
              <el-select class="gender" v-model="user.gender" clearable placeholder="请选择性别">
                <el-option v-for="(item, index) in genderList" :key="index" :label="item" :value="item"/>
              </el-select>
            </div>

            <div class="line-2">
              <div class="birth-text">出生年月</div>
              <el-select class="birth-year" v-model="user.selectedBirthYear" clearable placeholder="请选择出生年份">
                <el-option v-for="item in birthYear" :key="item.index" :label="item.value" :value="item.value"/>
              </el-select>
              <div class="text">年</div>
              <el-select class="birth-month" v-model="user.selectedBirthMonth" clearable placeholder="请选择出生月份">
                <el-option v-for="item in birthMonth" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
              <div class="text">月</div>
            </div>

            <div class="line-3">
              <div class="emails-text">邮&nbsp;&nbsp;&nbsp;&nbsp;箱</div>
              <el-input class="emails" v-model="user.emails" placeholder="请输入邮箱" clearable/>
            </div>

            <div class="line-4">
              <div class="phone-text">手机号码</div>
              <div class="phone">{{user.telephone}}</div>
            </div>

            <div class="line-5">
              <div class="jno-text">工&nbsp;&nbsp;&nbsp;&nbsp;号</div>
              <div class="jno">{{user.jno}}</div>
            </div>

            <div class="line-6">
              <div class="unit-name-text">单位名称</div>
              <div class="unit-name">{{unit.name}}</div>
            </div>

            <div class="line-7">
              <div class="unit-descriptions-text">单位描述</div>
              <el-input class="unit-descriptions" type="textarea" v-model="unit.descriptions" placeholder="请输入单位描述" />
            </div>

            <div class="line-8">
              <div class="unit-loc-text">单位地点</div>
              <el-input class="unit-loc" v-model="unit.area" placeholder="请输入单位地点" clearable/>
              <el-button class="save" type="primary" round color="#B886F8" :dark="true" @click="save()">
                <div class="title">保存</div>
              </el-button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
// import { useStore } from 'vuex'

export default {
  name: 'UserInfoedit',
  components: {
    MainMenu
  },
  props: {},
  emits: [],
  setup () {
    const route = useRoute() // 使用路由
    const router = useRouter() // 使用路由
    // const store = useStore()

    const state = reactive({
      // 用户信息
      user: {
        phone: '',
        pwd: '',
        pwd2: '',
        username: '',
        gender: '', // 要把汉字转为对应的数字0或1
        emails: '',
        selectedBirthYear: '',
        selectedBirthMonth: '',
        jno: '',
        age: 0
      },
      // 单位的配置数据
      unit: {
        name: '',
        area: '',
        descriptions: '',
        jobNums: 0
      },
      birthYear: [], // 出生年月下拉框
      birthMonth: [], // 出生年月下拉框
      genderList: ['男', '女'], // 性别下拉框
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
      state.user = JSON.parse(route.query.user)
      state.unit = JSON.parse(route.query.unit)
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

    const save = () => {
      // 处理年龄
      const ageStr = state.user.selectedBirthYear + '-' + state.user.selectedBirthMonth + '-01'
      const theAge = getAge(ageStr)
      let birthYear = ''
      let birthMonth = ''
      birthYear = state.user.selectedBirthYear
      if (parseInt(state.user.selectedBirthMonth) >= 1 && parseInt(state.user.selectedBirthMonth) <= 9) {
        birthMonth = '0' + state.user.selectedBirthMonth
      } else {
        birthMonth = state.user.selectedBirthMonth
      }

      // 处理性别
      let theGender = 0
      if (state.user.gender === '男') {
        theGender = 1
      } else {
        theGender = 0
      }
      // 调api
      const input = {
        telephone: state.user.telephone,
        gender: theGender,
        age: theAge,
        birth_year: birthYear,
        birth_month: birthMonth,
        emails: state.user.emails,
        unit_descriptions: state.unit.descriptions,
        unit_loc: state.unit.area
      }
      theAxios.post('http://114.55.239.213:8087/users/info/edit_emp', input)
        .then(res => {
          console.log('编辑用户信息接口的返回数据', res.data.data)

          if (res.data.data.memo === '该账号不存在') {
            state.nocontent = true
            ElNotification({
              title: '注意啦',
              message: '该账号不存在',
              type: 'warning',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '请检查输入的信息是否完整') {
            state.nocontent = true
            ElNotification({
              title: '注意啦',
              message: '请检查输入的信息是否完整',
              type: 'warning',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '修改个人信息成功') {
            state.nocontent = false

            router.push({
              path: '/userhome/index',
              query: {
                refresh: true // 刷新页面获取最新数据
              }
            })

            ElNotification({
              title: '成功啦',
              message: '修改个人信息成功',
              type: 'success',
              position: 'top-right', // 右上
              offset: 60
            })
          }
          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

    return {
      ...toRefs(state),
      save,
      getAge
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height: calc( 100% - 54px );
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('/public/img/logandreg/背景（紫粉）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  // 菜单
  .left-box{
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-box{
      width: 80%;
      height: 100%;
      background: none;
      display: flex;
      flex-direction: column;
      margin-bottom: 45px;
    }
  }

  // 主体部分
  .right-box{
    width: 80%;
    height: calc( 100% );
    // 超出自动换行
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    // 标题
    .top-box{
      width: 90%;
      height: 9%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 4px;

      .title{
        width: auto;
        height: auto;
        margin-left: 70px;

        font-weight: 600;
        font-size: 24px;
        color: #000000;
        font-family: DingTalk_JinBuTi_Regular;
      }
    }

    // 正文
    .main-box{
      width: 90%;
      height: 86%;
      display: flex;
      flex-direction: row;
      justify-content: center; // 水平居中
      margin-top: 22px;
      margin-bottom: 4px;

      // 左边
      .left-box{
        width: 25%;
        height: 18%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 2px;

        // 头像部分
        .head-box{
          width: 100%;
          height: 100%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 4px 4px 2px #d5d5d5;//阴影
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .head{
            width: 70px;
            height: 70px;
            margin-left: 5px;
            margin-right: 5px;
            box-shadow: 3px 3px 1px #d5d5d5;//阴影
          }

          .text-box{
            width: calc( 100% - 97px - 10px );
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 10px;

            .top{
              width: 100%;
              height: auto;

              .username{
                width: auto;
                height: auto;
                font-weight: 600;
                font-size: 24px;
                color: #000000;
                font-family: TsangerYuYangT_W04_W04;
              }
            }

            .bottom{
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;
              align-items: center;

              .gender{
                width: 40px;
                height: auto;
                padding: 5px 10px;
              }
              .age{
                width: 50px;
                height: auto;
                padding: 5px 10px;
                margin-left: 15px;
              }
              .admin{
                width: 50px;
                height: auto;
                padding: 5px 10px;
                margin-left: 15px;
              }
            }
          }
        }
      }

      // 右边
      .right-box{
        width: 70%;
        height: 91%;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 4px 4px 2px #d5d5d5;//阴影
        display: flex;
        flex-direction: column;
        margin-left: 60px;

        // 标题
        .title{
          width: 100%;
          height: 10%;
          font-weight: 600;
          font-size: 24px;
          color: #000000;
          font-family: TsangerYuYangT_W04_W04;
          text-align: left;
          margin-left: 5%;
          margin-top: 25px;
        }

        // 表单区域
        .info-box{
          width: 90%;
          height: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 5%;
          margin-bottom: 2%;//控制表单与标题的间距

          // 第1行
          .line-1{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;

            // 性别
            .gender-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #FFB1B1;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .gender{
              width: 180px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              text-align: left;
            }
          }

          // 第2行
          .line-2{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 出生年月
            .birth-text{
              width:70px;
              height:100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #5FC715;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }

            .birth-year,.birth-month{
              width:180px;
              height: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              margin-left: 20px;
            }

            .text{
              width: 40px;
              height: 100%;
              font-weight: 500;
              font-size: 20px;
              color: #000000;
              font-family: zcool-gdh_Regular;
              margin-left: 8px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            }
          }

          // 第3行
          .line-3{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 邮箱
            .emails-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #FF86BF;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .emails{
              width: 470px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              text-align: left;
            }
          }

          // 第4行
          .line-4{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 手机号
            .phone-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #FF86BF;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .phone{
              width: 180px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中
              padding: 5px 0;

              font-weight: 400;
              font-size: 16px;
              color: #b8b8b8;
              text-align: left;
            }
          }

          // 第5行
          .line-5{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 工号
            .jno-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #54C5F9;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .jno{
              width: 180px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中
              padding: 5px 0;

              font-weight: 400;
              font-size: 16px;
              color: #b8b8b8;
              text-align: left;
            }
          }

          // 第6行
          .line-6{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 单位名称
            .unit-name-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #54C5F9;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .unit-name{
              width: 500px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中
              padding: 5px 0;

              font-weight: 400;
              font-size: 16px;
              color: #b8b8b8;
              text-align: left;
            }
          }

          // 第7行
          .line-7{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 描述
            .unit-descriptions-text{
              width:70px;
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #54C5F9;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部间距
              padding: 6px 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .unit-descriptions{
              width: 470px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              text-align: left;
            }
          }

          // 第8行
          .line-8{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10px;

            // 描述
            .unit-loc-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #54C5F9;
              color: #ffffff;
              border-radius: 10px;
              box-shadow: 2px 2px 1px #d5d5d5;//阴影
              //内部左右间距
              padding-left: 5px;
              padding-right: 5px;

              //文字居中
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .unit-loc{
              width: 470px;
              height: 100%;
              max-height: 60px;//最大高度
              margin: auto 3px auto 20px;//垂直方向居中

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              text-align: left;
            }

            //保存按钮
            .save{
              width: 70px;
              height: 30px;
              border-radius: 10px;
              color: #ffffff;
              border: none;
              box-shadow: 2px 2px 2px #898989;//阴影
              margin-left: 25px;

              .title{
                font-weight: 600;
                font-size: 14px;
                color: #ffffff;
                font-family: TsangerYuYangT_W04_W04;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin-bottom: 23px;//调整位置实现居中
              }
            }
            .save:hover,.save:focus {
              background: #a72af0;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
