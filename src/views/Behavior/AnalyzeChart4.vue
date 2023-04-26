<template>
  <div class="box">
    <div class="chart" id="chart4" ref="chart2"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount, nextTick, watch } from 'vue'
import * as echarts from 'echarts' // 引入
// import moment from 'moment'

export default {
  name: 'AnalyzeChart4',
  components: {
  },
  props: ['data'],
  setup (props) {
    const state = reactive({
      user: {
        phone: '',
        pwd: '',
        token: ''
      },
      dataList: [], // 数据
      nocontent: false // 是否显示404内容
    })

    onBeforeMount(() => {
    })

    // 监听
    watch(
      () => props.data,
      (newVal, oldVal) => {
        SetChart()
      }
    )

    // 产生不重复的随机数
    const random = (arr, max, min, need) => {
      const num = Math.floor((Math.random() * (max - min)) + min) // 随机数
      if (arr.indexOf(num) === -1) { // 不存在，加入数组
        arr.push(num)
      } else { // 存在，重新调用
        random(arr, max, min, need)
      }
      if (arr.length < need) { // 数组长度<需要的个数，就重新调用
        random(arr, max, min, need)
      }
    }

    const SetChart = () => {
      nextTick(() => {
        const myChart = echarts.init(document.getElementById('chart4')) // 声明组件

        let stuNames = [] // 数组
        let numNames = [] // 数组
        for (let i = 0; i < (JSON.parse(props.data)).length; i++) {
          stuNames.push((JSON.parse(props.data))[i].stuName)
          numNames.push((JSON.parse(props.data))[i].numName)
        }

        // 数组去重
        stuNames = [...new Set(stuNames)]
        numNames = [...new Set(numNames)]

        // 颜色数组
        const color = ['#9459FD', '#FDD760', '#FD8460', '#99FD60', '#60E4FD', '#6A60FD', '#FD60AC']

        // 生成不重复随机数
        const numArr = []
        random(numArr, 0, 7, 4)

        // 构造堆叠柱状图数据
        const series = []
        for (let i = 0; i < numNames.length; i++) {
          const obj = {
            name: numNames[i],
            type: 'bar', // 柱状图
            stack: 'As', // 堆叠
            emphasis: {
              focus: 'series'
            },
            itemStyle: { // 折线+图例的颜色
              color: color[numArr[i]] // 随机颜色
            },
            data: [],
            barWidth: '20%',
            yAxisIndex: 1 // 指定y轴，默认左侧是0
          }
          series.push(obj)
        }

        // 处理series的data，按照相同stuName进行堆叠
        JSON.parse(props.data).forEach((v1) => {
          series.forEach((v2) => {
            // series中遍历的v2的数量名称 与 当前遍历的源数据中的数量名称相同，
            // 且当前遍历的源数据中的学生姓名在stuNames数组中，
            // 就把其所在数组中的位置上的数据设置为遍历的v1的num值
            if (v2.name === v1.numName && stuNames.indexOf(v1.stuName) > -1) {
              v2.data[stuNames.indexOf(v1.stuName)] = v1.num
            }
          })
        })

        // 先把每个学生的数据放在一个对象中
        const dataInfo = {}
        JSON.parse(props.data).forEach((item, index) => {
          const { stuName } = item // 解构，等价于const obj = item; const stuName = obj.stuName;
          // 数组中不存在该学生姓名，就新建一个对象
          if (!dataInfo[stuName]) {
            dataInfo[stuName] = {
              stuName,
              numArr: [] // 存放每个学生的三种数据的值
            }
          }
          dataInfo[stuName].numArr.push(item) // 数据加入数组
        })
        const list = Object.values(dataInfo) // list为处理后的数据
        // console.log('list', list)

        // 构造折线图数据
        const percent = [] // 存放每个学生的录用率的对象数组（包含姓名+录用率）
        for (let i = 0; i < list.length; i++) {
          // 分别求每个学生的三种数的和
          let sum = 0
          list[i].numArr.forEach(v => {
            sum += v.num
          })

          // 求占比
          list[i].numArr.forEach(v => {
            // 找到录用数所在元素，计算百分比
            if (v.numName === '录用数') {
              const obj = {
                stuName: list[i].stuName,
                percent: ((v.num * 1.0 / sum) * 100).toFixed(2)
              }
              percent.push(obj)
            }
          })
        }
        // console.log('percent', percent)

        // 构造折线图数据的series
        const lineData = []
        percent.forEach(v => {
          lineData.push(v.percent)
        })
        const lineObj = {
          name: '录用率',
          type: 'line',
          symbol: 'circle', // 拐点样式
          symbolSize: 10, // 拐点大小
          itemStyle: { // 折线+图例的颜色
            color: color[numArr[1]] // 随机颜色
          },
          data: lineData,
          yAxisIndex: 0 // 指定y轴，默认左侧是0
        }
        series.push(lineObj)

        // 选项
        const options = {
          // 标题
          title: {
            text: '活跃',
            textStyle: {
              color: '#F7A82B',
              fontSize: '14px'
            }
          },
          // 悬停框
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            // padding: [10, 110, 10, 10], // 内边距
            // formatter: function (params) {
            //   let res = `
            //               <div>
            //                 <div style='display: inline-block; width: 10px; height: 20px;
            //                   color: #F7A82B;'>
            //                   ${params[0].name}
            //                 </div>
            //               </div>
            //             `
            //   let idx = 0
            //   params.forEach(v => {
            //     const nameArr = ['报名数', '录用数', '取消数', '录用率']
            //     res += `
            //             <div>
            //               <div style='display: inline-block; width: 10px; height: 20px;
            //                 color: ${color[numArr[idx]]}'>
            //                 ● ${nameArr[idx]}：${v.value}
            //               </div>
            //             </div>
            //            `
            //     idx = (idx + 1) % 4 // idx取下一个位置的
            //   })
            //   return res
            // },
            // 悬浮框中文字的样式
            textStyle: {
              fontSize: 13,
              fontFamily: 'DingTalk_JinBuTi_Regular'
            }
          },
          // 宫格
          grid: {
            show: false,
            top: '40',
            bottom: '45',
            right: '45',
            left: '55'
          },
          // 图例
          legend: {
            bottom: 0,
            left: 'center',
            // 文字样式
            textStyle: {
              color: '#000000',
              fontSize: 12
            },
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 30 // 图例间隙
          },
          // x轴
          xAxis: [{
            type: 'category',
            data: stuNames, // 学生姓名
            boundaryGap: true,
            axisLine: { // 轴线
              lineStyle: {
                color: '#F7A82B',
                opacity: 0.5
              }
            },
            axisTick: { // 刻度
              alignWithLabel: true, // 刻度线标签对齐
              lineStyle: {
                color: '#F7A82B',
                opacity: 0 // 不显示
              }
            }
          }],
          // y轴
          yAxis: [
            // 左边
            {
              type: 'value',
              name: '录用率',
              show: true,
              interval: 20, // 间距
              splitLine: { // 分割线
                show: true, // 刻度线标签对齐
                lineStyle: {
                  color: '#FFEED4'
                }
              },
              axisLabel: {
                formatter: '{value}%'
              }
            },
            // 右边
            {
              type: 'value',
              name: '数量',
              splitLine: { // 分割线
                show: false, // 刻度线标签是否对齐
                interval: 20, // 间距
                lineStyle: {
                  color: '#FFEED4'
                }
              }
            }
          ],
          series: series
        }
        myChart.setOption(options)
      })
    }

    onMounted(() => {
      SetChart()
    })

    return {
      ...toRefs(state),
      SetChart,
      props,
      random
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  // echart图指定宽高
  .chart{
    width: 100%;
    height:100%;
    background: #ffffff;
    overflow: hidden;//使用白背景+溢出隐藏，解决背景是页面背景的bug
  }
}
</style>
