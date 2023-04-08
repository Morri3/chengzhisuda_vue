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
          <div class="update-time">最近更新于2023年1月17日 08:28:39</div>
        </div>
        <!--line2-->
        <div class="line-2">
          <div class="name-1">兼职名称</div>
          <div class="content-1">{{parttime.name}}</div>
          <div class="name-2">薪酬</div>
          <div class="content-2">{{parttime.salary}}</div>
          <el-tag class="tag" :type="parttime.settlement.type">
            {{ parttime.settlement.value }}
          </el-tag>
          <div class="placeholder"></div>
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
          <el-button class="next" type="primary" round color="#B886F8" :dark="true" @click="nextPage(parttime, unit)">
            <div class="title">下一页</div>
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
  name: 'ParttimeDetail',
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

    // 下一页
    const nextPage = (parttime, unit) => {
      console.log('填写的parttime', parttime)
      console.log('填写的unit', unit)

      router.push({
        path: '/parttime/list/detail2'
      })
    }

    return {
      ...toRefs(state),
      openItem,
      getParttimeList,
      nextPage
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
            width:80px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
          .status{
            width: 64px;
            height: 22px;
          }
          .placeholder{
            width: 244px;
            height: auto;
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
        width: auto;
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
            color: #000000;
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
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            font-family: zcool-TsangerYuYangT_W04_W04;
            text-align: left;
          }
      }

        .btn-box{
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .btn{
            width: 65px;
            height: 30px;
            color: #ffffff;
            border: none;
            border-radius: 10px;

            .title{
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              font-family: zcool-TsangerYuYangT_W04_W04;
            }
          }
          .btn:hover,.btn:focus {
            background: #a72af0;
            border: none;
          }
      }
    }
  }
}
</style>
