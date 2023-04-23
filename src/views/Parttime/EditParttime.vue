<template>
  <div class="box">
    <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <div class="right-box">
      <!--标题-->
      <div class="top-box">
        <div class="title">编辑兼职</div>
      </div>

      <!--表单信息-->
      <div class="main-box">
        <!--line1-->
        <div class="line-1">
          <el-steps class="steps" :active="active" align-center :hollow="true">
            <el-step class="step-title" title="填写兼职信息"/>
            <el-step class="step-title" title="点击“确认编辑”按钮"/>
          </el-steps>
        </div>

        <!--line2-->
        <div class="line-2">
          <div class="name-1">兼职名称</div>
          <el-input class="content-1" v-model="parttime.name" placeholder="请输入兼职名称" :minlength="1" clearable ref="name" :style="{'--wrapperColor': colorVal}" @input="changeBorder"
            disabled>
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>

          <div class="name-2">薪酬</div>
          <el-input class="content-2" v-model="parttime.salary" placeholder="请输入薪酬" :minlength="1" clearable ref="salary">
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>
        </div>

        <!--line3-->
        <div class="line-3">
          <div class="name-1">工作地点</div>
          <el-input class="content-1" v-model="parttime.area" placeholder="请输入工作地点" :minlength="1" clearable ref="area">
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>

          <div class="name-2">经验要求</div>
          <el-select class="content-2" v-model="parttime.exp" placeholder="请选择经验要求" clearable ref="exp">
            <el-option v-for="(item, index) in expList" :key="index" :label="item" :value="item">
              <template #prefix>
                <el-icon class="must"><Star /></el-icon><!--必填星星-->
              </template>
            </el-option>
          </el-select>
        </div>

        <!--line4-->
        <div class="line-4">
          <div class="name-1">工作内容</div>
          <el-input class="content-1" v-model="parttime.content" :rows="2" type="textarea" placeholder="请输入工作内容"
            :minlength="1" ref="content" >
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>

          <div class="name-2">工作要求</div>
          <el-input class="content-2" v-model="parttime.requirement" :rows="2" type="textarea" placeholder="请输入工作要求"
            :minlength="1" ref="requirement" >
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>
        </div>

        <!--line5-->
        <div class="line-5">
          <div class="name-1">截止时间</div>
          <div class="content-1">
            <el-date-picker class="choose-date" v-model="parttime.ddl" type="datetime" placeholder="请选择截止时间" clearable ref="signupDdl"/>
          </div>

          <div class="name-2">结付方式</div>
          <el-radio-group v-model="parttime.settlement" class="content-2" ref="settlement">
            <el-radio class="radio-1" :label="1" size="large">月结</el-radio>
            <el-radio class="radio-2" :label="2" size="large">学期结算</el-radio>
          </el-radio-group>

          <div class="name-3">岗位名额</div>
          <el-input class="content-3" v-model="parttime.num" placeholder="请输入名额" :minlength="1" clearable ref="num">
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>
        </div>
        <!--line6-->
        <div class="line-6">
          <div class="name-1">工作时间</div>
          <el-input class="content-1" v-model="parttime.worktime" placeholder="请输入工作时间" :minlength="1" clearable ref="workTime" >
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>

          <div class="name-2">兼职种类</div>
          <el-select class="content-2" v-model="parttime.category" placeholder="请选择兼职种类" clearable ref="category">
            <el-option v-for="(item, index) in categoryList" :key="index" :label="item" :value="item"/>
          </el-select>
        </div>

        <!--line7-->
        <div class="line-7">
          <div class="name-1">单位描述</div>
          <el-input class="content-1" v-model="unit.descriptions" placeholder="请输入单位描述" disabled/>

          <div class="name-2">所在单位</div>
          <el-input class="content-2" v-model="unit.name" placeholder="请输入所在单位" disabled/>
        </div>
        <!--line8-->
        <div class="line-8">
          <div class="name-1">兼职标语</div>
          <el-input class="content-1" v-model="parttime.slogan" placeholder="请输入兼职标语" :minlength="1" clearable ref="slogan" >
            <template #prefix>
              <el-icon class="must"><Star /></el-icon><!--必填星星-->
            </template>
          </el-input>

          <div class="name-2">单位地点</div>
          <el-col :span="8">
            <el-input class="content-2" v-model="unit.area" placeholder="请输入单位地点" style="width: 280px;"
            disabled />
          </el-col>

          <!--发布兼职按钮-->
          <el-button class="publish" type="primary" round color="#FC9119" :dark="true" @click="save()">
            <el-icon class="icon-publish"><Plus /></el-icon>
            <div class="title">确认编辑</div>
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
import moment from 'moment'

export default {
  name: 'EditParttime',
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
      user: {},
      sub: { // 控制二级菜单的开关
        sub1: false,
        sub2: false,
        sub3: false
      },
      // 兼职的表单数据
      parttime: {
        pId: 0,
        settlement: '',
        category: '',
        name: '',
        salary: '',
        area: '',
        exp: '',
        content: '',
        requirement: '',
        ddl: '',
        slogan: '',
        worktime: '',
        num: ''
      },
      // 单位的配置数据
      unit: {},
      // 可选的兼职种类列表
      categoryList: [
        '课程助教', '学生助理', '军训助理', '体测助理', '讲解员', '公寓宣传员', '班助', '服务员'
      ],
      // 可选的经验要求
      expList: [
        '无需经验，有培训', '1至5次经验', '1个月', '1个学期', '1学年'
      ],
      datetimerange: [], // 时间选择器的时间范围
      active: 1 // 时间线的进度
    })

    onBeforeMount(() => {
      state.active = 1 // 初始化时间线进度
      getData() // 获取要编辑的兼职信息（从兼职首页传入）
      getUnitInfo() // 获取单位信息
    })

    // 获取传进来的兼职信息
    const getData = () => {
      const input = JSON.parse(route.query.dataList)
      console.log('编辑兼职传来的信息', input)

      // 处理结付方式
      let theSettlement = 0
      if (input.settlement === '月结') {
        theSettlement = 1
      } else if (input.settlement === '学期结算') {
        theSettlement = 2
      }
      // 赋值给这个页面的变量
      const obj = {
        pId: input.p_id,
        settlement: theSettlement,
        category: input.category,
        name: input.position_name,
        salary: input.salary,
        area: input.area,
        exp: input.exp,
        content: input.content,
        requirement: input.requirement,
        ddl: input.signup_ddl,
        slogan: input.slogan,
        worktime: input.work_time,
        num: input.num_total // 名额数
      }
      state.parttime = obj // 赋值给兼职对象，显示在表单中
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

    // 保存修改
    const save = () => {
      // 检查表单的必填内容
      if (state.parttime.name === '') {
        //
      }

      // 转换结付方式
      let settlement = ''
      if (state.parttime.settlement === 1) {
        settlement = '月结'
      } else if (state.parttime.settlement === 2) {
        settlement = '学期结算'
      }

      // 发布兼职输入的dto
      const input = {
        op_id: store.state.user.phone,
        p_id: state.parttime.pId,
        category: state.parttime.category,
        salary: state.parttime.salary,
        area: state.parttime.area,
        exp: state.parttime.exp,
        content: state.parttime.content,
        requirement: state.parttime.requirement,
        signup_ddl: moment(state.parttime.ddl).format('YYYY-MM-DD HH:mm:ss'),
        slogan: state.parttime.slogan,
        work_time: state.parttime.worktime,
        settlement: settlement,
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        num_total: state.parttime.num
      }
      console.log('000', input.signup_ddl)

      // 调api，编辑兼职
      theAxios.post('http://114.55.239.213:8087/parttime/edit', input)
        .then(res => {
          console.log('编辑兼职接口的返回数据', res.data.data)

          if (res.data.data.memo === '不存在该兼职发布者') {
            ElNotification({
              title: '出错啦',
              message: '不存在该兼职发布者',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '请检查输入的表单信息是否完整') {
            ElNotification({
              title: '出错啦',
              message: '请检查输入的表单信息是否完整',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '只能编辑已发布且无人录取的兼职') {
            ElNotification({
              title: '出错啦',
              message: '只能编辑已发布且无人录取的兼职',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '该兼职发布者不存在单位') {
            ElNotification({
              title: '出错啦',
              message: '该兼职发布者不存在单位',
              type: 'error',
              position: 'top-right', // 右上
              offset: 60
            })
          } else if (res.data.data.memo === '编辑成功') {
            console.log('编辑的兼职信息', res.data.data)

            // 跳转到兼职首页
            router.push({
              path: '/parttime'
            })

            ElNotification({
              title: '成功啦',
              message: '编辑成功',
              type: 'success',
              position: 'top-right', // 右上
              offset: 60
            })
          }
          state.active = 2 // 更新时间线进度

          // 跳转
          router.push({
            path: '/parttime/list'
          })
        })
        .catch(err => {
          console.error(err)
        })
    }

    const getUnitInfo = () => {
      // 调api，根据op_id找到unit信息
      theAxios.get('http://114.55.239.213:8087/parttime/unit/get?op_id=' + store.state.user.phone)
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
          } else if (res.data.data.memo === '不能操作非负责的兼职') {
            ElNotification({
              title: '出错啦',
              message: '不能操作非负责的兼职',
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

    const changeBorder = () => {
      state.colorVal = '#d5b5ff'
    }

    return {
      ...toRefs(state),
      openItem,
      save,
      changeBorder,
      getUnitInfo,
      getData
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

      // 必填星星
      .must{
        width: 10px;
        height: 10px;
        color: red;
      }

      // 必填项没填时动态绑定样式
      ::v-deep .el-input__wrapper{
        color: var(--wrapperColor); // 使用css变量
      }

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
            font-family: TsangerYuYangT_W04_W04;
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
            font-family: TsangerYuYangT_W04_W04;

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
          font-family: TsangerYuYangT_W04_W04;

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
            font-family: TsangerYuYangT_W04_W04;

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
          font-family: TsangerYuYangT_W04_W04;

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
            font-family: TsangerYuYangT_W04_W04;

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
            font-family: TsangerYuYangT_W04_W04;

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
            font-family: TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .content-1{
          width:320px;
          height: auto;
          margin-left: 10px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
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
          font-family: TsangerYuYangT_W04_W04;

          // 文字居中
          text-align: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .content-2{
          width:200px;
          height: 60px;
          margin-left: 20px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
          text-align: left;

          //水平布局
          display: flex;
          flex-direction: row;
          align-items: center;

          .radio-1{
            margin-left: 10px;
          }
          .radio-2{
            margin-left: 10px;
          }
        }
        .name-3{
          margin-left: 30px;
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
        .content-3{
          width:120px;
          height: auto;
          margin-left: 10px;

          font-weight: 400;
          font-size: 16px;
          color: #000000;
          text-align: left;
        }
      }

      .line-8{
          width: 95%;
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
            font-family: TsangerYuYangT_W04_W04;

            // 文字居中
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .content-1{
            width:300px;
            height: auto;
            margin-left: 10px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            text-align: left;
          }
          .name-2{
            margin-left: 42px;
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
          .content-2{
            width:200px;
            height: auto;
            margin-left: 20px;

            font-weight: 400;
            font-size: 16px;
            color: #000000;
            text-align: left;
          }
          .publish{
            width:90px;
            height: 32px;
            border-radius: 10px;
            color: #ffffff;
            border: none;
            box-shadow: 2px 2px 2px #898989;//阴影
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-left: 20px;

            .icon-publish{
              width: 40px;
              height: 40px;
            }

            .title{
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              font-family: TsangerYuYangT_W04_W04;
              margin-right: 10px;
              margin-left: -5px;
            }
          }
          .publish:hover,.publish:focus {
            background: #f0d22a;
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
      .line-3{
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
            font-family: TsangerYuYangT_W04_W04;

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
            font-family: TsangerYuYangT_W04_W04;

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
            text-align: left;
          }
      }
    }
  }
}
</style>
