<template>
  <!-- <div> -->
  <div class="box">
      <!--菜单-->
    <div class="left-box">
      <MainMenu class="menu-box"/>
    </div>

    <!--右边的四个图-->
    <div class="right-box">
      <!--上面2个-->
      <div class="top-box">
        <!--上左折线图-->
        <div class="chart-box">
          <AnalyzeChart1 :data="JSON.stringify(data1)" class="chart"></AnalyzeChart1>
        </div>

        <!--上右堆叠柱状图-->
        <div class="chart-box">
          <AnalyzeChart2 :data="JSON.stringify(data2)" class="chart"></AnalyzeChart2>
        </div>
      </div>

      <!--下面2个-->
      <div class="bottom-box">
        <!--下左-->
        <div class="chart-box">
          <AnalyzeChart3 :data="JSON.stringify(data3)" class="chart"></AnalyzeChart3>
        </div>

        <!--下右-->
        <div class="chart-box">
          <!-- <AnalyzeChart4 :data="JSON.stringify(data4)" class="chart"></AnalyzeChart4> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
// import { useRouter } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import theAxios from 'axios'
import { ElNotification } from 'element-plus'
// import { useStore } from 'vuex'
import AnalyzeChart1 from './AnalyzeChart1.vue'
import AnalyzeChart2 from './AnalyzeChart2.vue'
import AnalyzeChart3 from './AnalyzeChart3.vue'
// import AnalyzeChart4 from './AnalyzeChart4.vue'

export default {
  name: 'UserBehavior',
  components: {
    MainMenu,
    AnalyzeChart1,
    AnalyzeChart2,
    AnalyzeChart3
    // AnalyzeChart4
  },
  props: {},
  setup () {
    // const router = useRouter() // 使用路由
    // const route = useRoute() // 使用路由
    // const store = useStore()

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
      dataList: [], // 报名数据列表
      nocontent: false, // 404
      data1: [], // 图1数据
      data2: [], // 图2数据
      data3: [] // 图3数据
      // data4: [] // 图4数据
    })

    onBeforeMount(() => {
      getData1()
      getData2()
      getData3()
    })

    const getData1 = () => {
      // 调api，获取图1数据
      theAxios.get('http://114.55.239.213:8087/analyze/publish/get')
        .then(res => {
          console.log('获取分析图1接口的返回数据', res.data.data)

          let flag = false // 判断是否没数据
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '暂无兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂无兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            state.nocontent = false
            console.log('每日兼职发布数', res.data.data)

            // 有数据
            if (res.data.data.length > 0) {
              const list = [] // 存放数据
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].memo === '获取成功') {
                  // 有报名信息才显示
                  list.push({
                    date: res.data.data[i].date,
                    num: res.data.data[i].num
                  })
                }
              }
              state.data1 = list
              console.log('分析图1数据', state.data1)
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const getData2 = () => {
      // 调api，获取图2数据
      theAxios.get('http://114.55.239.213:8087/analyze/parttimes/get')
        .then(res => {
          console.log('获取分析图2接口的返回数据', res.data.data)

          let flag = false // 判断是否没数据
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '暂无兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂无兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            state.nocontent = false
            console.log('报名/录取/名额数', res.data.data)

            // 有数据
            if (res.data.data.length > 0) {
              const list = [] // 存放数据
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].memo === '获取成功') {
                  // 有报名信息才显示
                  list.push({
                    createTime: res.data.data[i].create_time,
                    empId: res.data.data[i].emp_id,
                    empName: res.data.data[i].emp_name,
                    numName: res.data.data[i].num_name,
                    num: res.data.data[i].num,
                    pId: res.data.data[i].p_id,
                    pName: res.data.data[i].p_name
                  })
                }
              }
              state.data2 = list
              console.log('分析图2数据', state.data2)
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const getData3 = () => {
      // 调api，获取图3数据
      theAxios.get('http://114.55.239.213:8087/analyze/mark/get')
        .then(res => {
          console.log('获取分析图3接口的返回数据', res.data.data)

          let flag = false // 判断是否没数据
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].memo === '获取成功') {
              flag = true
            }
          }
          if (flag === false) {
            // 说明没数据
            const theRes = res.data.data[0]
            if (theRes.memo === '暂无兼职') {
              state.nocontent = true
              ElNotification({
                title: '注意啦',
                message: '暂无兼职',
                type: 'warning',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '获取失败') {
              state.nocontent = true
              ElNotification({
                title: '失败啦',
                message: '获取失败',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            } else if (theRes.memo === '该兼职暂无评分') {
              state.nocontent = true
              ElNotification({
                title: '失败啦',
                message: '该兼职暂无评分',
                type: 'error',
                position: 'top-right', // 右上
                offset: 60
              })
            }
          } else {
            state.nocontent = false
            console.log('评分', res.data.data)

            // 有数据
            if (res.data.data.length > 0) {
              const list = [] // 存放数据
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].memo === '获取成功') {
                  // 有评分才显示
                  list.push({
                    pName: res.data.data[i].p_name,
                    num: res.data.data[i].avg_total
                  })
                }
              }
              state.data3 = list
              console.log('分析图3数据', state.data3)
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    onMounted(() => {
    })

    return {
      ...toRefs(state),
      getData1,
      getData2,
      getData3
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
  background-image: url('/public/img/logandreg/背景（橙紫）.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 54px;
  overflow-x:hidden;

  //菜单
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

  //四个图
  .right-box{
    width:70%;
    height: calc( 100% - 54px - 54px );
    margin-right: 5%;
    margin-left: 5%;
    background: #ffffff;
    // 超出自动换行
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 4px 4px 2px #d5d5d5;//阴影

    //上面2个
    .top-box{
      width: 90%;
      height: 45%;

      margin-top: -10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center; // 水平居中
      .chart-box{
        width: 50%;
        height: 100%;
        //margin-right: 5%;
        .chart{
          width: 100%;
          height: 100%;
        }
      }
    }

    //下面2个
    .bottom-box{
      width: 90%;
      height: 45%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center; // 水平居中
      .chart-box{
        width: 50%;
        height: 100%;
        .chart{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
