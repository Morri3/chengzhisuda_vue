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
          <div class="title">点评信息</div>
          <div class="update-time">最近更新于2023年1月17日 08:28:39</div>
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
          <el-button class="prior" type="primary" round color="#B886F8" :dark="true" @click="priorPage(parttime, unit)">
            <div class="title">上一页</div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'ParttimeDetail2',
  components: {
    MainMenu
  },
  props: {},
  emits: [],
  setup () {
    const router = useRouter() // 使用路由

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
      parttime: {
        id: 1, // 兼职的id
        settlement: {
          type: 'primary',
          value: '学期结'
        },
        category: {
          type: 'warning',
          value: '学生助理'
        },
        status: {
          type: 'primary',
          value: '已发布'
        },
        name: 'name',
        salary: 'salary',
        area: 'area',
        exp: 'exp',
        content: 'content',
        requirement: 'requirement',
        ddl: 'ddl',
        slogan: 'slogan',
        worktime: 'worktime'
      },
      unit: {
        id: 1, // 单位的id
        name: 'name',
        descriptions: 'descriptions',
        area: 'area',
        jobNums: 0
      },
      mark: { // 评分
        total: 8,
        pf: 7,
        pl: 9,
        we: 8,
        lt: 8,
        pt: 6,
        ods: 3,
        dsps: 10
      }
    })

    onBeforeMount(() => {
      getParttimeList() // 调api获取数据
    })

    const getParttimeList = () => {
      console.log('调api取数据')
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

    // 上一页
    const priorPage = (parttime, unit) => {
      console.log('填写的parttime', parttime)
      console.log('填写的unit', unit)

      router.push({
        path: '/parttime/list/detail'
      })
    }

    return {
      ...toRefs(state),
      openItem,
      getParttimeList,
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

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
          font-family: zcool-TsangerYuYangT_W04_W04;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .content{
            width:40px;
            height: 30px;
            margin-left: 20px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

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
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
        }
        .prior{
          width: 60px;
          height: 30px;
          border-radius: 10px;
          color: #ffffff;
          border: none;
          box-shadow: 2px 2px 2px #898989;//阴影
          margin-left:430px;
          margin-top: 16px;

          .title{
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            font-family: zcool-TsangerYuYangT_W04_W04;
          }
        }
        .num{
          width: 155px;
          height: auto;
          margin-left: 10px;
          font-weight: 600;
          font-size: 13px;
          color: #ff9900;
          font-family: zcool-TsangerYuYangT_W04_W04;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

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
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
        }
        .num{
          width: auto;
          height: auto;
          margin-left: 10px;
          font-weight: 600;
          font-size: 13px;
          color: #ff9900;
          font-family: zcool-TsangerYuYangT_W04_W04;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

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
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
        }
        .num{
          width: auto;
          height: auto;
          margin-left: 10px;
          font-weight: 600;
          font-size: 13px;
          color: #ff9900;
          font-family: zcool-TsangerYuYangT_W04_W04;
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
            font-family: zcool-TsangerYuYangT_W04_W04;

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
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
        }
        .num{
          width: auto;
          height: auto;
          margin-left: 10px;
          font-weight: 600;
          font-size: 13px;
          color: #ff9900;
          font-family: zcool-TsangerYuYangT_W04_W04;
          margin-left: 70px;
          margin-top: 6px;
        }
      }
      .line-2,.line-3,.line-4,.line-5,.line-6,.line-7,.line-8,.line-9{
        margin-top: 10px;
      }
    }
  }
}
</style>
