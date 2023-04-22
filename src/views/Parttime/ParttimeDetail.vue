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
        <!--line1-->
        <div class="line-1">
          <div class="title">兼职信息</div>
          <el-tag class="status" :type="parttime.status.type">
            {{ parttime.status.value }}
          </el-tag>
          <el-tag class="category" :type="parttime.category.type">
            {{ parttime.category.value }}
          </el-tag>
          <div class="update-time">{{parttime.updateTime}}</div>
        </div>
        <!--line2-->
        <div class="line-2">
          <div class="name-1">兼职名称</div>
          <div class="content-1">{{parttime.name}}</div>
          <div class="name-2">薪酬</div>
          <div class="content-2"><i>{{parttime.salary}}</i></div>
          <el-tag class="tag" :type="parttime.settlement.type">
            {{ parttime.settlement.value }}
          </el-tag>
        </div>
        <!--line3-->
        <div class="line-3">
          <div class="name-1">工作地点</div>
          <div class="content-1">{{parttime.area}}</div>
          <div class="name-2">经验要求</div>
          <div class="content-2">{{parttime.exp}}</div>
        </div>
        <!--line4-->
        <div class="line-4">
          <div class="name-1">工作内容</div>
          <div class="content-1">{{parttime.content}}</div>
          <div class="name-2">工作要求</div>
          <div class="content-2">{{parttime.requirement}}</div>
        </div>
        <!--line5-->
        <div class="line-5">
          <div class="name-1">截止时间</div>
          <div class="content-1">{{parttime.ddl}}</div>
          <div class="name-2">兼职标语</div>
          <div class="content-2">{{parttime.slogan}}</div>
        </div>
        <!--line6-->
        <div class="line-6">
          <div class="name-1">工作时间</div>
          <div class="content-1">{{parttime.worktime}}</div>
        </div>
        <!--line7-->
        <div class="line-7">单位信息</div>
        <!--line8-->
        <div class="line-8">
          <div class="name-1">所在单位</div>
          <div class="content-1">{{unit.name}}</div>
          <div class="name-2">单位描述</div>
          <div class="content-2">{{unit.descriptions}}</div>
        </div>
        <!--line9-->
        <div class="line-9">
          <div class="name-1">单位地点</div>
          <div class="content-1">{{unit.area}}</div>
          <div class="name-2">招聘数量</div>
          <div class="content-2">{{unit.jobNums}}</div>
          <el-button class="next" type="primary" round color="#B886F8" :dark="true" @click="nextPage()">
            <div class="title">下一页</div>
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

export default {
  name: 'ParttimeDetail',
  components: {
    MainMenu
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由
    const route = useRoute() // 使用路由

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
      parttime: {}, // 兼职数据
      unit: {} // 发布方所在单位数据
    })

    onBeforeMount(() => {
      if (JSON.parse(route.query.type) === 0) {
        // 从兼职列表页传入
        getData()
      } else {
        // 从下一页点击上一页进入
        getLastPageData()
      }
    })

    const getData = () => {
      console.log('获取路由传递来的兼职数据', JSON.parse(route.query.dataList))
      const input = JSON.parse(route.query.dataList) // 这里是获取proxy包裹的对象
      // 构造种类1
      let settlementType = ''
      if (input.settlement === '学期结') {
        settlementType = 'primary'
      } else if (input.settlement === '月结') {
        settlementType = 'warning'
      }
      // 构造种类3
      let statusType = ''
      if (input.status === '已发布') {
        statusType = 'primary'
      } else if (input.position_status === '已招满') {
        statusType = 'warning'
      } else if (input.position_status === '已结束') {
        statusType = 'error'
      }
      // 构造数据对象
      const theParttime = {
        id: input.p_id,
        settlement: {
          type: settlementType,
          value: input.settlement
        },
        category: {
          type: 'warning',
          value: input.category
        },
        status: {
          type: statusType,
          value: input.position_status
        },
        name: input.position_name,
        salary: input.salary,
        area: input.area,
        exp: input.exp,
        content: input.content,
        requirement: input.requirement,
        ddl: input.signup_ddl,
        slogan: input.slogan,
        worktime: input.work_time,
        updateTime: input.update_time ? '最近更新于' + input.update_time : '尚未更新',
        createTime: input.create_time,
        opId: input.op_id
      }
      state.parttime = JSON.parse(JSON.stringify(theParttime)) // 赋值
      console.log('当前兼职', JSON.parse(JSON.stringify(theParttime)))

      // 调api，根据op_id找到unit信息
      theAxios.get('http://114.55.239.213:8087/parttime/unit/get?op_id=' + state.parttime.opId)
        .then(res => {
          console.log('获取单位信息接口的返回数据', res.data.data)

          if (res.data.data.memo === '请检查输入信息') {
            ElNotification({
              title: '出错啦',
              message: '请检查输入信息',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '不存在该单位') {
            ElNotification({
              title: '出错啦',
              message: '不存在该单位',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '不存在该兼职发布者') {
            ElNotification({
              title: '出错啦',
              message: '不存在该兼职发布者',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '获取单位信息成功') {
            // 构造对象
            const theUnit = {
              id: res.data.data.u_id,
              name: res.data.data.unit_name,
              descriptions: res.data.data.descriptions,
              area: res.data.data.loc,
              jobNums: res.data.data.job_nums
            }
            state.unit = theUnit
            console.log('当前兼职发布者所在单位信息', state.unit)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const getLastPageData = () => {
      console.log('获取路由传递来的兼职数据', JSON.parse(route.query.parttime))
      console.log('获取路由传递来的单位数据', JSON.parse(route.query.unit))
      state.parttime = JSON.parse(route.query.parttime) // 这里是获取proxy包裹的对象
      state.unit = JSON.parse(route.query.unit) // 这里是获取proxy包裹的对象
    }

    onMounted(() => {
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

    // 下一页
    const nextPage = () => {
      router.push({
        path: '/parttime/list/detail2',
        query: {
          parttime: JSON.stringify(state.parttime), // 将这两个传过去，当点击上一页时，将这两个传回来
          unit: JSON.stringify(state.unit)
        }
      })
    }

    return {
      ...toRefs(state),
      openItem,
      getData,
      nextPage,
      getLastPageData
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .line-2{
        width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-top: 15px;

          .name-1{
            margin-left: 10px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 700;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W05_W05;
            text-align: left;
          }
          .name-2{
            margin-left: 20px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-2{
            width:80px;
            height: auto;
            margin-left: 10px;
            padding-right: 50px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .tag{
            width: 64px;
            height: 27px;
            margin-right: 187px;
          }
      }
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
        .status{
          width: 64px;
          height: 28px;
          margin-left: 20px;
        }
        .category{
          width: 80px;
          height: 28px;
          margin-left: 10px;
        }
        .update-time{
          width: auto;
          height: auto;
          font-weight: 400;
          font-size: 16px;
          color: #000000;
          font-family: zcool-TsangerYuYangT_W04_W04;
          text-align: left;
          margin-left: 15px;
        }
      }
      .line-4{
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;

          .name-1{
            margin-left: 10px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: 60px;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;

            //溢出上下滚动条显示
            display: inline-block;
            overflow-y:scroll;
            overflow-x:hidden;
            &::-webkit-scrollbar {
              width: 0;//隐藏滚动条
            }
          }
          .name-2{
            margin-left: 20px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-2{
            width:380px;
            height: 60px;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;

            //溢出上下滚动条显示
            display: inline-block;
            overflow-y:scroll;
            overflow-x:hidden;
            &::-webkit-scrollbar {
              width: 0;//隐藏滚动条
            }
          }
      }
      .line-6{
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;

          .name-1{
            margin-left: 22.5px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
      }
      .line-7{
        width: 90%;
        height: auto;
        font-weight: 700;
        font-size: 16px;
        color: #000000;
        font-family: DingTalk_JinBuTi_Regular;

        // 文字居中
        text-align: center;
        margin-right: 930px;
      }
      .line-9{
        width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .name-1{
            margin-left: 10px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .name-2{
            margin-left: 20px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-2{
            width:320px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #ff1eff;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
        .next{
          width: 60px;
          height: 30px;
          border-radius: 10px;
          color: #ffffff;
          border: none;
          box-shadow: 2px 2px 2px #898989;//阴影

          .title{
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            font-family: zcool-TsangerYuYangT_W04_W04;
          }
        }
        .next:hover,.next:focus {
          background: #a72af0;
          border: none;
        }
      }
      .line-7{
        margin-top: 25px;
      }
      .line-3,.line-4,.line-5,.line-6,.line-8,.line-9{
        margin-top: 15px;
      }
      .line-5{
        width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .name-1{
            margin-left: 10px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #fa2121;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .name-2{
            margin-left: 20px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-2{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
      }
      .line-3,.line-8{
          width: 90%;
          height: auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .name-1{
            margin-left: 10px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .name-2{
            margin-left: 20px;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-2{
            width:380px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
      }
    }
  }
}
</style>
