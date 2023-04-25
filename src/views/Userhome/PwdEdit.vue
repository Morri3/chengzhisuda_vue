<template>
  <div class="box">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">密码管理</div>
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
          <div class="title">修改密码</div>
          <div class="info-box">

            <div class="line-1">
              <div class="pwd-text">原&nbsp;&nbsp;密&nbsp;&nbsp;码</div>
              <el-input class="pwd" v-model="user.pwd" clearable placeholder="请输入原密码" show-password/>
            </div>

            <div class="line-2">
              <div class="pwd-text">新&nbsp;&nbsp;密&nbsp;&nbsp;码</div>
              <el-input class="pwd" v-model="user.pwd2" clearable placeholder="请输入新密码" show-password/>
            </div>

            <div class="line-3">
              <div class="pwd-text">确认密码</div>
              <el-input class="pwd" v-model="user.confirmPwd" clearable placeholder="请再次输入新密码" show-password/>
            </div>

            <div class="line-4">
              <el-button class="save" type="primary" round color="#B886F8" :dark="true" @click="save()">
                <div class="title">确认修改</div>
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
  name: 'PwdEdit',
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
        confirmPwd: '', // 确认密码
        username: '',
        gender: '', // 要把汉字转为对应的数字0或1
        emails: '',
        selectedBirthYear: '',
        selectedBirthMonth: '',
        jno: '',
        age: 0
      },
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
      state.user = JSON.parse(route.query.user) // 获取路由传来的用户信息
    })

    onMounted(() => {
    })

    const save = () => {
      // 判断输入的内容
      if (!state.user.pwd || !state.user.pwd2 || !state.user.confirmPwd) {
        // 无输入
        ElNotification({
          title: '注意啦',
          message: '请输入密码',
          type: 'warning',
          position: 'top-right', // 右上
          offset: 60
        })
      } else {
        // 有输入，验证是否符合两次新密码相同
        if (state.user.pwd2 !== state.user.confirmPwd) {
          ElNotification({
            title: '注意啦',
            message: '请确保两次新密码输入正确',
            type: 'warning',
            position: 'top-right', // 右上
            offset: 60
          })
        } else {
          // 输入校验通过，调api
          const input = {
            telephone: state.user.telephone,
            old_pwd: state.user.pwd,
            new_pwd: state.user.pwd2,
            new_pwd2: state.user.confirmPwd
          }
          theAxios.post('http://114.55.239.213:8087/users/info/modify_emp_pwd', input)
            .then(res => {
              console.log('编辑密码接口的返回数据', res.data.data)

              if (res.data.data.memo === '两次新密码请输入正确') {
                state.nocontent = true
                ElNotification({
                  title: '注意啦',
                  message: '两次新密码请输入正确',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '请输入正确的旧密码') {
                state.nocontent = true
                ElNotification({
                  title: '注意啦',
                  message: '请输入正确的旧密码',
                  type: 'warning',
                  position: 'top-right', // 右上
                  offset: 60
                })
              } else if (res.data.data.memo === '该账号不存在') {
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
              } else if (res.data.data.memo === '修改密码成功') {
                state.nocontent = false

                ElNotification({
                  title: '成功啦',
                  message: '修改密码成功',
                  type: 'success',
                  position: 'top-right', // 右上
                  offset: 60
                })

                router.push({
                  path: '/userhome/index'
                })
              }
              state.ready = true
            })
            .catch(err => {
              console.error(err)
            })
        }
      }
    }

    return {
      ...toRefs(state),
      save
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
          align-items: center;//水平居中
          margin-right: 5%;
          margin-bottom: 2%;//控制表单与标题的间距

          // 第1行
          .line-1,.line-2,.line-3{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;//水平居中

            // 密码
            .pwd-text{
              width:70px;
              height: 100%;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W05_W05;
              text-align: center;
              background: #ff4a4a;
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
            .pwd{
              width: 400px;
              height: 100%;
              max-height: 60px;//最大高度
              margin-left: 30px;

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
            justify-content: flex-end;//水平靠右对齐
            margin-top: 40px;

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

          //2、3行间距
          .line-2,.line-3{
            margin-top: 35px;
          }
        }
      }
    }
  }
}
</style>
