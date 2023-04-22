<template>
  <div class="box" v-if="secondRoutes">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">个人信息管理</div>
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
              </div>
            </div>
          </div>

          <!--单位信息部分-->
          <div class="unit-box">
            <div class="title">单位信息</div>
            <div class="line-2">
              <div class="jno-text">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</div>
              <div class="jno">{{user.jno}}</div>
            </div>
            <div class="line-3">
              <div class="name-text">单位名称</div>
              <div class="name">{{unit.name}}</div>
            </div>
            <div class="line-4">
              <div class="descriptions-text">单位描述</div>
              <div class="descriptions">{{unit.descriptions}}</div>
            </div>
            <div class="line-5">
              <div class="area-text">单位地点</div>
              <div class="area">{{unit.area}}</div>
            </div>
            <div class="line-6">
              <div class="jobnums-text">招聘数量</div>
              <div class="jobnums">{{unit.jobNums}}</div>
            </div>
          </div>
        </div>

        <!--右边部分-->
        <div class="right-box">
          <!--身份信息-->
          <div class="info-box">
            <div class="title">身份信息</div>
            <div class="info">
              <div class="emails-text">邮箱</div>
              <div class="emails">{{user.emails}}</div>
              <div class="phone-text">手机号码</div>
              <div class="phone">{{user.telephone}}</div>
            </div>
          </div>

          <!--操作部分-->
          <div class="operation">
            <el-button class="modify-info" type="warning" round color="#FFCC71" :dark="true" @click="modifyInfo(user, unit)">
              <div class="title">个人信息修改</div>
            </el-button>
            <el-button class="modify-pwd" type="warning" round color="#FFCC71" :dark="true" @click="modifyPwd(user)">
              <div class="title">密码管理</div>
            </el-button>
            <el-button class="app-introduction" type="warning" round color="#FFCC71" :dark="true" @click="appIntroduction()">
              <div class="title">APP介绍</div>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="box" v-else>
    <router-view/>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'UserInfoManage',
  components: {
    MainMenu
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由
    const store = useStore()

    const state = reactive({
      // 用户信息
      user: {
        // phone: '18968966599',
        // pwd: '',
        // token: '',
        // emails: '111@163.com',
        // username: 'aaa',
        // gender: '男',
        // age: 23,
        // jno: 'J00000',
        // head: '/img/userhome/icon_head1.jpeg'
      },
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      // 单位的配置数据
      unit: {},
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
      getUserData(2)
    })

    const getUserData = (type) => {
      // 调api
      theAxios.get('http://114.55.239.213:8087/users/info/get_emp?telephone=' + store.state.user.phone)
        .then(res => {
          console.log('用户信息接口的返回数据', res.data.data)

          if (res.data.data.memo === '该账号不存在') {
            state.nocontent = true
            ElNotification({
              title: '注意啦',
              message: '该账号不存在',
              type: 'warning',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '获取成功') {
            state.nocontent = false

            // 处理性别
            let theGender = ''
            if (res.data.data.gender === 1) {
              theGender = '男'
            } else {
              theGender = '女'
            }

            // 处理头像
            let theHead = ''
            if (res.data.data.head === null || res.data.data.head === undefined || res.data.data.head === '0') {
              if (theGender === '男') {
                theHead = '/img/userhome/head1.png'
              } else {
                theHead = '/img/userhome/head2.png'
              }
            }
            console.log(theHead)

            // 构造对象
            const obj1 = {
              username: res.data.data.emp_name,
              gender: theGender,
              emails: res.data.data.emails,
              age: res.data.data.age,
              telephone: res.data.data.telephone,
              jno: res.data.data.jno,
              head: theHead
            }

            const obj2 = {
              name: res.data.data.unit_name,
              descriptions: res.data.data.unit_descriptions,
              area: res.data.data.unit_loc,
              jobNums: res.data.data.job_nums
            }

            // 赋值
            state.user = obj1
            state.unit = obj2
            console.log('用户信息', state.user)
            console.log('单位信息', state.unit)

            if (type === 1) {
              ElNotification({
                title: '成功啦',
                message: '获取个人信息成功',
                type: 'success',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          }
          state.ready = true
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
      getUserData(1) // 调api获取数据
    })

    // 菜单打开
    const openItem = (item) => {
      switch (item) {
        case '兼职管理': {
          state.sub.sub1 = !state.sub.sub1
          break
        }
        case '兼职点评': {
          state.sub.sub2 = !state.sub.sub2
          break
        }
        case '个人中心': {
          state.sub.sub3 = !state.sub.sub3
          break
        }
      }
    }

    const modifyInfo = (data1, data2) => {
      router.push({
        path: '/userhome/edit',
        query: {
          user: JSON.stringify(data1),
          unit: JSON.stringify(data2)
        }
      })
    }

    const modifyPwd = (user) => {
    }

    const appIntroduction = () => {
    }

    // 是否是二级路由
    const secondRoutes = computed(() => {
      let res = null
      if (route.path === '/parttime/list' || route.path === '/parttime/signup' ||
        route.path === '/markcomment/mark' || route.path === '/markcomment/comment' ||
        route.path === '/userhome/index') {
        // 是二级路由
        res = true
      } else {
        res = false
      }
      return res
    })

    return {
      ...toRefs(state),
      openItem,
      getUserData,
      modifyInfo,
      modifyPwd,
      appIntroduction,
      secondRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  //height: 91.1%;
  height: calc( 100% - 54px );
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('/public/img/logandreg/背景（紫粉）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 54px;

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
    height: calc( 100% - 54px - 54px );
    // 超出自动换行
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    // 标题
    .top-box{
      width: 90%;
      height: 10%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      display: flex;
      flex-direction: row;
      align-items: center;

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
      height: 88%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;

      // 左边
      .left-box{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        // 头像部分
        .head-box{
          width: 100%;
          height: 20%;
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
                font-family: zcool-TsangerYuYangT_W04_W04;
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
            }
          }
        }

        // 单位信息部分
        .unit-box{
          width: 100%;
          height: 70%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 4px 4px 2px #d5d5d5;//阴影
          display: flex;
          flex-direction: column;
          margin-top: 20px;
          padding-bottom: 10px;

          .title{
            width: 100%;
            height: auto;
            font-weight: 600;
            font-size: 24px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
            margin-left: 15px;
            margin-top: 25px;
          }

          // 第2行
          .line-2{
            width: calc( 100% - 15px );
            height: auto;
            margin-left: 15px;
            margin-top: 20px;
            //垂直居中
            display: flex;
            flex-direction: row;
            align-items: center;

            .jno-text{
              width:70px;
              height:25px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
              margin-left: 10px;
              margin-right: 3px;

              //溢出隐藏，省略号表示
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          // 第3行
          .line-3{
            width: calc( 100% - 15px );
            height: auto;
            margin-left: 15px;
            margin-top: 15px;
            //垂直居中
            display: flex;
            flex-direction: row;
            align-items: center;

            .name-text{
              width:70px;
              height:25px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
            .name{
              width: 180px;
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
              margin-left: 10px;
              margin-right: 3px;

              //溢出隐藏，省略号表示
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          // 第4行
          .line-4{
            width: calc( 100% - 15px );
            height: auto;
            margin-left: 15px;
            margin-top: 15px;
            //垂直居中
            display: flex;
            flex-direction: row;

            .descriptions-text{
              width:70px;
              height: 25px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
            .descriptions{
              width: 180px;
              height: auto;
              max-height: 60px;//最大高度
              margin: auto 3px auto 10px;//垂直方向居中
              //溢出上下滚动条显示
              display: inline-block;
              overflow-y:scroll;
              overflow-x:hidden;
              &::-webkit-scrollbar {
                width: 0;//隐藏滚动条
              }

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
            }
          }

          // 第5行
          .line-5{
            width: calc( 100% - 15px );
            height: auto;
            margin-left: 15px;
            margin-top: 15px;
            //垂直居中
            display: flex;
            flex-direction: row;
            align-items: center;

            .area-text{
              width:70px;
              height: 25px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
            .area{
              width: 180px;
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
              margin-left: 10px;
              margin-right: 3px;

              //溢出隐藏，省略号表示
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          // 第6行
          .line-6{
            width: calc( 100% - 15px );
            height: auto;
            margin-left: 15px;
            margin-top: 15px;
            //垂直居中
            display: flex;
            flex-direction: row;
            align-items: center;

            .jobnums-text{
              width:70px;
              height:25px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
            .jobnums{
              width: 180px;
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #ff1eff;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
              margin-left: 10px;
              margin-right: 3px;

              //溢出隐藏，省略号表示
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      // 右边
      .right-box{
        width: 75%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        //身份信息
        .info-box{
          width: calc( 100% - 60px );
          height: 19%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 4px 4px 2px #d5d5d5;//阴影
          display: flex;
          flex-direction: column;
          margin-left: 60px;
          padding-bottom: 10px;

          .title{
            width: 100%;
            height: auto;
            font-weight: 600;
            font-size: 24px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
            margin-left: 15px;
            margin-top: 15px;
          }

          //第二行
          .info{
            width: calc( 100% - 60px );
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 15px;
            margin-top: 10px;

            .emails-text,.phone-text{
              width:100px;
              height: 30px;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W05_W05;
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
            .emails,.phone{
              width: 200px;
              height: auto;
              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: zcool-TsangerYuYangT_W04_W04;
              text-align: left;
              margin-left: 10px;
              margin-right: 3px;

              //溢出隐藏，省略号表示
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        //操作部分
        .operation{
          width: calc(100% - 60px);
          height: 72%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 4px 4px 2px #d5d5d5;//阴影
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          margin-left: 60px;

          //按钮1
          .modify-info,.modify-pwd,.app-introduction{
            width: 300px;
            height: 30px;
            border-radius: 10px;
            color: #ffffff;
            border: none;
            box-shadow: 2px 2px 2px #898989;//阴影
            margin: 0;//居中

            .title{
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              font-family: zcool-TsangerYuYangT_W04_W04;
            }
          }

          .modify-pwd,.app-introduction{
            margin-top: 30px;
          }

          .modify-info:hover,.modify-info:focus,
          .modify-pwd:hover,.modify-pwd:focus,
          .app-introduction:hover,.app-introduction:focus {
            background: #f7a210;
            border: none;
          }
        }
      }
    }
  }
}
</style>
