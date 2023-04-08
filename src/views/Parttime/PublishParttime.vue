<template>
  <div class="box">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">发布兼职</div>
      </div>

      <!--表单信息-->
      <div class="main-box">
        <!--line1-->
        <div class="line-1">
          <el-steps class="steps" :active="1" align-center>
            <el-step class="step-title" title="填写兼职信息"/>
            <el-step class="step-title" title="点击“确认发布”按钮"/>
          </el-steps>
        </div>
        <!--line2-->
        <div class="line-2">
          <div class="name-1">兼职名称</div>
          <el-input class="content-1" v-model="parttime.name" placeholder="请输入兼职名称"/>
          <div class="name-2">薪酬</div>
          <el-input class="content-2" v-model="parttime.salary" placeholder="请输入薪酬"/>
        </div>
        <!--line3-->
        <div class="line-3">
          <div class="name-1">工作地点</div>
          <el-input class="content-1" v-model="parttime.area" placeholder="请输入工作地点"/>
          <div class="name-2">经验要求</div>
          <el-select class="content-2" v-model="parttime.exp" placeholder="请选择经验要求">
            <el-option v-for="item in expList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <!--line4-->
        <div class="line-4">
          <div class="name-1">工作内容</div>
          <el-input class="content-1" v-model="parttime.content" :rows="2" type="textarea" placeholder="请输入工作内容"/>
          <div class="name-2">工作要求</div>
          <el-input class="content-2" v-model="parttime.requirement" :rows="2" type="textarea" placeholder="请输入工作要求"/>
        </div>
        <!--line5-->
        <div class="line-5">
          <div class="name-1">截止时间</div>
          <div class="content-1">
            <el-date-picker class="choose-date" v-model="parttime.ddl" type="datetime" placeholder="请选择日期与时间"/>
          </div>
          <div class="name-2">结付方式</div>
          <el-radio-group v-model="parttime.settlement.value" class="content-2">
            <el-radio class="radio-1" label="1" size="large">月结</el-radio>
            <el-radio class="radio-2" label="2" size="large">学期结算</el-radio>
          </el-radio-group>
        </div>
        <!--line6-->
        <div class="line-6">
          <div class="name-1">工作时间</div>
          <el-input class="content-1" v-model="parttime.worktime" placeholder="请输入工作时间"/>
          <div class="name-2">兼职种类</div>
          <el-select class="content-2" v-model="parttime.category.value" placeholder="请选择兼职种类">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <!--line7-->
        <div class="line-7">
          <div class="name-1">单位描述</div>
          <el-input class="content-1" v-model="unit.descriptions" placeholder="请输入单位描述"/>
          <div class="name-2">所在单位</div>
          <el-input class="content-2" v-model="unit.name" placeholder="请输入所在单位"/>
        </div>
        <!--line8-->
        <div class="line-8">
          <div class="name-1">兼职标语</div>
          <el-input class="content-1" v-model="unit.slogan" placeholder="请输入兼职标语"/>
          <div class="name-2">单位地点</div>
          <el-col :span="8">
            <el-input class="content-2" v-model="unit.area" placeholder="请输入单位地点" style="width: 280px;"/>
          </el-col>
          <el-button class="publish" type="primary" round color="#B886F8" :dark="true" @click="publish(parttime, unit)">
            <div class="title">发布兼职</div>
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
  name: 'PublishParttime',
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
        id: 0, // 兼职的id
        settlement: {
          type: 'primary',
          value: ''
        },
        category: {
          type: 'warning',
          value: ''
        },
        status: {
          type: 'primary',
          value: ''
        },
        name: '',
        salary: '',
        area: '',
        exp: '',
        content: '',
        requirement: '',
        ddl: '',
        slogan: '',
        worktime: ''
      },
      unit: {
        id: 0, // 单位的id
        name: '',
        descriptions: '',
        area: '',
        jobNums: 0
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

    // 发布兼职
    const publish = (id) => {
      console.log('发布的兼职的信息', id)

      // 调api，发布兼职

      router.push({
        path: '/parttime/list'
      })
    }

    return {
      ...toRefs(state),
      openItem,
      getParttimeList,
      publish
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
        justify-content: center;
        align-items: center;

        .steps{
          width: 100%;
          height: 50px;

          .step-title{
            font-weight: 550;
            font-size: 16px;
            color: #ffffff;
            font-family: zcool-TsangerYuYangT_W04_W04;
          }
        }
      }
      .line-2{
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
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
          height: 33px;
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
          height: 30px;
          margin-left: 20px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
          font-family: zcool-TsangerYuYangT_W04_W04;
          text-align: left;
        }
      }
      .line-3,.line-6,.line-7{
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .name-1{
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
          height: 33px;
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
          height: 33px;
          margin-left: 20px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
          font-family: zcool-TsangerYuYangT_W04_W04;
          text-align: left;
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
            margin-left: 20px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
      }
      .line-5{
        width: 90%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
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

          .choose-date{
            width: 100%;
            height: 100%;
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
          margin-left: 20px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
          font-family: zcool-TsangerYuYangT_W04_W04;
          text-align: left;

          .radio-1{
            margin-left: 10px;
          }
          .radio-2{
            margin-left: 200px;
          }
        }
      }

      .line-8{
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
            width:280px;
            height: auto;
            margin-left: 20px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }

          .publish{
            width: 70px;
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
          .publish:hover,.publish:focus {
            background: #a72af0;
            border: none;
          }
      }
      .line-3,.line-4,.line-5,.line-6,.line-7,.line-8{
        margin-top: 15px;
      }
      .line-2{
        margin-top: 5px;
      }
      .line-6,.line-7{
        margin-left: 8px;
      }
      .line-3,.line-5,.line-8{
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
            margin-left: 20px;

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
