<template>
  <div class="box">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">兼职详情</div>
      </div>

      <!--表单信息-->
      <div class="main-box">

        <!--评分-->
        <div class="mark-box">
          <!--line1-->
          <div class="line-1">
            <div class="title">点评信息</div>
            <!-- <div class="update-time">最近更新于{{parttime.createTime}}</div> -->
          </div>
          <!--line2-->
          <div class="line-2">
            <div class="name">总体评分</div>
            <div class="content">{{mark.total}} 分</div>
          </div>
          <!--line3-->
          <div class="line-3">
            <div class="name">薪资水平</div>
            <el-rate class="star" v-model="mark.pf" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.pf}} 分</div>
          </div>
          <!--line4-->
          <div class="line-4">
            <div class="name">闲时待遇</div>
            <el-rate class="star" v-model="mark.pl" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.pl}} 分</div>
          </div>
          <!--line5-->
          <div class="line-5">
            <div class="name">专业技能满意度</div>
            <el-rate class="star" v-model="mark.we" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.we}} 分</div>
          </div>
          <!--line6-->
          <div class="line-6">
            <div class="name">专业契合度</div>
            <el-rate class="star" v-model="mark.lt" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.lt}} 分</div>
          </div>
          <!--line7-->
          <div class="line-7">
            <div class="name">工作环境</div>
            <el-rate class="star" v-model="mark.pt" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.pt}} 分</div>
          </div>
          <!--line8-->
          <div class="line-8">
            <div class="name">岗前培训</div>
            <el-rate class="star" v-model="mark.ods" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.ods}} 分</div>
          </div>
          <!--line9-->
          <div class="line-9">
            <div class="name">总体收获满意度</div>
            <el-rate class="star" v-model="mark.dsps" disabled allow-half :max="10"
              text-color="#ff9900" clearable size="large"
            />
            <div class="num">{{mark.dsps}} 分</div>
          </div>
        </div>

        <!--评论-->
        <div class="comment-box">
          <!--有评论数据-->
          <vue3-seamless-scroll class="scroll-box" v-if="comment.length > 0" :list="comment" :step="0.13"
            :limitScrollNum="5" :hover="true">
            <div class="content-box" v-for="(item, index) in comment" :key="index" :value="item" :label="item">
              <div class="top">
                <div class="time">{{item.createTime}}</div>
                <div class="user">{{item.stuName}}</div>
              </div>
              <div class="content">{{item.content}}</div>
            </div>
          </vue3-seamless-scroll>

          <!--404-->
          <div class="scroll-box" v-else>
            <div class="no-content">暂无评论</div>
          </div>

          <!--上一页-->
          <el-button class="prior" type="primary" round color="#5B92FF" :dark="true" @click="priorPage()">
            <div class="title">上一页</div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll' // 无缝滚动组件

export default {
  name: 'ParttimeDetail2',
  components: {
    MainMenu,
    Vue3SeamlessScroll
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由
    const store = useStore()

    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        token: ''
      },
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      parttime: {},
      unit: {},
      mark: {}, // 评分
      comment: [] // 评论
    })

    onBeforeMount(() => {
      // getData() // 获取数据
      // getData2()
    })

    const getData = () => {
      console.log('获取上一页传来的数据', JSON.parse(route.query.parttime))
      console.log('获取上一页传来的数据', JSON.parse(route.query.unit))
      state.parttime = JSON.parse(route.query.parttime)
      state.unit = JSON.parse(route.query.unit)

      // 调api根据p_id获取评分信息
      theAxios.get('http://114.55.239.213:8087/mark/getAll?p_id=' + state.parttime.id)
        .then(res => {
          console.log('评分接口的返回数据', res.data.data)

          if (res.data.data.memo === '获取成功') {
            const theMark = {
              total: res.data.data.total_score,
              pf: res.data.data.pf,
              pl: res.data.data.pl,
              we: res.data.data.we,
              lt: res.data.data.lt,
              pt: res.data.data.pt,
              ods: res.data.data.ods,
              dsps: res.data.data.dsps,
              createTime: res.data.data.create_time
            }
            state.mark = theMark
            console.log('当前兼职评分数据', state.mark)
          } else if (res.data.data.memo === '获取失败') {
            ElNotification({
              title: '出错啦',
              message: '获取失败',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const getData2 = () => {
      // 调api根据p_id获取评论信息
      theAxios.get('http://114.55.239.213:8087/comments/emp/getAll?p_id=' + state.parttime.id +
        '&emp_id=' + store.state.user.phone)
        .then(res => {
          console.log('评论接口的返回数据', res.data.data)

          let flag = false // 判断是否调用成功
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取成功') {
              flag = true
            }
          }
          if (flag) {
            // 调用成功
            const arr = [] // 存放评论的数组
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].memo === '获取成功') {
                // 把有评论的那条加入数组
                const theComment = {
                  content: res.data.data[i].content,
                  cId: res.data.data[i].c_id,
                  sId: res.data.data[i].s_id,
                  stuName: res.data.data[i].username,
                  pName: res.data.data[i].p_name,
                  createTime: res.data.data[i].create_time
                }
                arr.push(theComment) // 加到数组arr中
                arr.push(theComment) // 加到数组arr中
                arr.push(theComment) // 加到数组arr中
                arr.push(theComment) // 加到数组arr中
                arr.push(theComment) // 加到数组arr中
              }
            }
            state.comment = arr // 赋值给arr
            console.log('当前兼职评论数据', state.comment)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
      getData() // 获取数据
      getData2()
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

    // 上一页
    const priorPage = () => {
      router.push({
        path: '/parttime/list/detail',
        query: {
          parttime: JSON.stringify(state.parttime), // 将这两个传过去，当点击上一页时，将这两个传回来
          unit: JSON.stringify(state.unit),
          type: 1
        }
      })
    }

    return {
      ...toRefs(state),
      openItem,
      getData,
      getData2,
      priorPage
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
  background-image: url('/public/img/logandreg/背景（黄绿）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

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
  .right-box{
    width: 80%;
    height: calc( 100% - 54px );
    // 超出自动换行
    display: flex;
    flex-direction: column;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 54px;

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

    .main-box{
      width: 90%;
      height: 88%;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 4px 4px 2px #d5d5d5;//阴影
      //水平
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      //评分
      .mark-box{
        width: 50%;
        height: 100%;
        //竖直
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .line-1{
          width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: center;

          .title{
            width: 64px;
            height: 24px;

            font-weight: 700;
            font-size: 16px;
            color: #000000;
            font-family: DingTalk_JinBuTi_Regular;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .update-time{
            width: auto;
            height: auto;
            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: TsangerYuYangT_W04_W04;
            text-align: left;
            margin-left: 15px;
          }
        }
        .line-2{
          width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 20px;
          .name{
              margin-left: 0px;
              width: 80px;
              height: 28px;
              background: #B886F8;
              color: #ffffff;
              border-radius: 5px;
              border: none;
              box-shadow: 2px 2px 2px #898989;//阴影

              font-weight: 550;
              font-size: 16px;
              color: #ffffff;
              font-family: TsangerYuYangT_W04_W04;

              // 文字居中
              text-align: center;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .content{
              width:108px;
              height: 30px;
              margin-left: 20px;

              font-weight: 700;
              font-size: 16px;
              color: #7e04e1;
              font-family: TsangerYuYangT_W05_W05;

              text-align: left;
              display: flex;
              flex-direction: row;
              align-items: center; // 垂直居中
            }
          }
          .line-9{
            justify-content: space-around;
          }
          .line-9{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;

            .name{
              margin-left: 0px;
              width: 76px;
              height: 50px;
              background: #B886F8;
              color: #ffffff;
              border-radius: 5px;
              border: none;
              box-shadow: 2px 2px 2px #898989;//阴影
              padding-left: 2px;
              padding-right: 2px;

              font-weight: 550;
              font-size: 13px;
              color: #ffffff;
              font-family: TsangerYuYangT_W04_W04;

              // 文字居中
              text-align: center;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .star{
              width:180px;
              height: 30px;
              margin-left: 20px;

              font-weight: 400;
              font-size: 16px;
              color: #000000;
              font-family: TsangerYuYangT_W04_W04;
              text-align: left;
            }

            .num{
              width: 130px;
              height: auto;
              margin-left: 10px;
              font-weight: 600;
              font-size: 13px;
              color: #ff9900;
              font-family: TsangerYuYangT_W04_W04;
              margin-left: 70px;
              margin-top: 6px;
            }
          }
          .line-5{
            width: 90%;
            height: auto;
            display: flex;
            flex-direction: row;

            .name{
              margin-left: 0px;
              width: 76px;
              height: 50px;
              background: #B886F8;
              color: #ffffff;
              border-radius: 5px;
              border: none;
              box-shadow: 2px 2px 2px #898989;//阴影
              padding-left: 2px;
              padding-right: 2px;

              font-weight: 550;
              font-size: 13px;
              color: #ffffff;
              font-family: TsangerYuYangT_W04_W04;

              // 文字居中
              text-align: center;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
          }
          .star{
            width:180px;
            height: 30px;
            margin-left: 20px;
            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .num{
            width: auto;
            height: auto;
            margin-left: 10px;
            font-weight: 600;
            font-size: 13px;
            color: #ff9900;
            font-family: TsangerYuYangT_W04_W04;
            margin-left: 70px;
            margin-top: 6px;
          }
        }
        .line-6{
          width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;

          .name{
            margin-left: 0px;
            width: 80px;
            height: 28px;
            background: #B886F8;
            color: #ffffff;
            border-radius: 5px;
            border: none;
            box-shadow: 2px 2px 2px #898989;//阴影

            font-weight: 550;
            font-size: 14px;
            color: #ffffff;
            font-family:TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .star{
            width:180px;
            height: 30px;
            margin-left: 20px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .num{
            width: auto;
            height: auto;
            margin-left: 10px;
            font-weight: 600;
            font-size: 13px;
            color: #ff9900;
            font-family: TsangerYuYangT_W04_W04;
            margin-left: 70px;
            margin-top: 6px;
          }
        }
        .line-3,.line-4,.line-7,.line-8{
          width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;

          .name{
            margin-left: 0px;
            width: 80px;
            height: 28px;
            background: #B886F8;
            color: #ffffff;
            border-radius: 5px;
            border: none;
            box-shadow: 2px 2px 2px #898989;//阴影

            font-weight: 550;
            font-size: 16px;
            color: #ffffff;
            font-family: TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .star{
            width:180px;
            height: 30px;
            margin-left: 20px;
            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .num{
            width: auto;
            height: auto;
            margin-left: 10px;
            font-weight: 600;
            font-size: 13px;
            color: #ff9900;
            font-family: TsangerYuYangT_W04_W04;
            margin-left: 70px;
            margin-top: 6px;
          }
        }
        .line-2,.line-3,.line-4,.line-5,.line-6,.line-7,.line-8,.line-9{
          margin-top: 10px;
        }
      }

      //评论
      .comment-box{
        width: 50%;
        height: 100%;
        //竖直
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;

        .scroll-box{
          width: 90%;
          height: 60%;
          overflow: hidden;//溢出隐藏
          //这里不能用flex布局
          margin: 45px 40px 20px 20px;
          //border: 3px solid #f69920;//边框[测试用]
          border-radius: 20px;
          box-shadow: 3px 3px 2px 2px #cc8624;//阴影
          padding-top: 10px;
          padding-bottom: 10px;

          //404
          .no-content{
            width: 100%;
            height: 100%;
            font-weight: 600;
            font-size: 26px;
            color: #b1b1b1;
            font-family: TsangerYuYangT_W04_W04;
            //使用margin实现居中
            margin-left: 195px;
            margin-top: 105px;
          }

          //评论内容
          .content-box{
            width: 100%;

            //竖直
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;//每个item间距

            .top{
              width:100%;
              height:auto;
              display: flex;
              flex-direction: row;
              align-items: center;
              padding-left: 20px;

              .time{
                width:170px;
                height:auto;

                font-weight: 400;
                font-size: 16px;
                font-family: Alimama_ShuHeiTi_Bold;
              }
              .user{
                width: 140px;
                height:auto;
                margin-left: 40px;
                //溢出隐藏，省略号表示
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                font-weight: 400;
                font-size: 16px;
                font-family: TsangerYuYangT_W05_W05;
              }
            }
            .content{
              width:100%;
              height:auto;
              text-align: left;

              font-weight: 400;
              font-size: 13px;
              color: #f69920;
              font-family: TsangerYuYangT_W04_W04;
              margin-top: 6px;
              padding-left: 40px;
            }
          }
        }

        // 上一页
        .prior{
          width: 60px;
          height: 30px;
          border-radius: 10px;
          color: #ffffff;
          border: none;
          box-shadow: 2px 2px 2px #898989;//阴影
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 425px;
          margin-top: 20px;

          .title{
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            font-family: TsangerYuYangT_W04_W04;
          }
        }
        .prior:hover,.prior:focus {
          background: #c061ff;
          border: none;
        }
      }
    }
  }
}
</style>
